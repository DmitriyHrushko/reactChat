import { useEffect } from 'react';
import {
	socket,
	connectSocket,
	isSocketConnected,
	joinProductRoom,
	leaveProductRoom,
	sendChatMessage,
	emitProductCreated,
	emitProductUpdated,
	emitProductDeleted,
} from '../services/socketService';
import { useAppDispatch } from '../app/hooks';
import { addMessage, loadChatHistory } from '../features/chat/chatSlice';
import { SocketEvent, type ChatMessage, type Product } from '../types';

export const useSocket = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		connectSocket();

		// Event handlers
		const handleChatMessage = (data: ChatMessage) => {
			console.log('💬 Chat message received:', data);
			dispatch(addMessage(data));
		};

		const handleChatHistory = (data: { productId: string; messages: ChatMessage[] }) => {
			console.log('📜 Chat history received:', data.messages.length, 'messages for product', data.productId);
			dispatch(loadChatHistory(data));
		};

		const handleProductCreated = (data: Product) => {
			console.log('✨ Product created:', data);
		};

		const handleProductUpdated = (data: Product) => {
			console.log('📝 Product updated:', data);
		};

		const handleProductDeleted = (data: { id: string }) => {
			console.log('🗑️ Product deleted:', data);
		};

		// Register listeners directly on socket
		socket.on(SocketEvent.CHAT_MESSAGE, handleChatMessage);
		socket.on(SocketEvent.CHAT_HISTORY, handleChatHistory);
		socket.on(SocketEvent.PRODUCT_CREATED, handleProductCreated);
		socket.on(SocketEvent.PRODUCT_UPDATED, handleProductUpdated);
		socket.on(SocketEvent.PRODUCT_DELETED, handleProductDeleted);

		// Cleanup
		return () => {
			socket.off(SocketEvent.CHAT_MESSAGE, handleChatMessage);
			socket.off(SocketEvent.CHAT_HISTORY, handleChatHistory);
			socket.off(SocketEvent.PRODUCT_CREATED, handleProductCreated);
			socket.off(SocketEvent.PRODUCT_UPDATED, handleProductUpdated);
			socket.off(SocketEvent.PRODUCT_DELETED, handleProductDeleted);
		};
	}, [dispatch]);

	return {
		socket,
		isConnected: isSocketConnected(),
		joinRoom: joinProductRoom,
		leaveRoom: leaveProductRoom,
		sendMessage: sendChatMessage,
		emitProductCreated,
		emitProductUpdated,
		emitProductDeleted,
	};
};
