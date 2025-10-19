import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { ChatMessage, CreateMessageInput } from '../../types';
import { getCurrentISODate } from '../../utils';

interface ChatState {
	messagesByProduct: Record<string, ChatMessage[]>;
	currentUserId: string;
}

const initialState: ChatState = {
	messagesByProduct: {},
	currentUserId: uuidv4(), // Generate unique user ID
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<ChatMessage>) => {
			const { productId, id, username, message } = action.payload;

			if (!state.messagesByProduct[productId]) {
				state.messagesByProduct[productId] = [];
			}

			// Check if message already exists (prevent duplicates)
			const messageExists = state.messagesByProduct[productId].some((msg) => msg.id === id);

			if (!messageExists) {
				state.messagesByProduct[productId].push(action.payload);
			} else {
				console.warn(`⚠️ Duplicate message prevented:`, {
					id,
					username,
					message,
					existingCount: state.messagesByProduct[productId].filter((m) => m.id === id).length,
				});
			}
		},

		loadChatHistory: (state, action: PayloadAction<{ productId: string; messages: ChatMessage[] }>) => {
			const { productId, messages } = action.payload;
			state.messagesByProduct[productId] = messages;
		},

		sendMessage: (state, action: PayloadAction<CreateMessageInput>) => {
			const { productId, message, username } = action.payload;

			const newMessage: ChatMessage = {
				id: uuidv4(),
				productId,
				userId: state.currentUserId,
				username: username || 'Anonymous',
				message,
				timestamp: getCurrentISODate(),
			};

			if (!state.messagesByProduct[productId]) {
				state.messagesByProduct[productId] = [];
			}

			state.messagesByProduct[productId].push(newMessage);
		},

		removeMessage: (state, action: PayloadAction<{ productId: string; messageId: string }>) => {
			const { productId, messageId } = action.payload;

			if (state.messagesByProduct[productId]) {
				state.messagesByProduct[productId] = state.messagesByProduct[productId].filter(
					(msg) => msg.id !== messageId
				);
			}
		},

		clearMessagesForProduct: (state, action: PayloadAction<string>) => {
			delete state.messagesByProduct[action.payload];
		},

		clearAllMessages: (state) => {
			state.messagesByProduct = {};
		},
	},
});

export const { addMessage, loadChatHistory, sendMessage, removeMessage, clearMessagesForProduct, clearAllMessages } =
	chatSlice.actions;

export default chatSlice.reducer;

// Selectors
export const selectMessagesByProduct = (productId: string) => (state: { chat: ChatState }) =>
	state.chat.messagesByProduct[productId] || [];

export const selectAllMessages = (state: { chat: ChatState }) => state.chat.messagesByProduct;

export const selectCurrentUserId = (state: { chat: ChatState }) => state.chat.currentUserId;
