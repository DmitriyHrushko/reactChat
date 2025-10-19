import type { ChatMessage } from './chat';
import type { Product } from './product';

export const SocketEvent = {
	// Connection events
	CONNECT: 'connect',
	DISCONNECT: 'disconnect',

	// Product events
	PRODUCT_CREATED: 'product-created',
	PRODUCT_UPDATED: 'product-updated',
	PRODUCT_DELETED: 'product-deleted',

	// Chat events
	CHAT_MESSAGE: 'chat-message',
	CHAT_HISTORY: 'chat-history',
	SEND_MESSAGE: 'send-chat-message',

	// Room events
	JOIN_PRODUCT_ROOM: 'join-product-room',
	LEAVE_PRODUCT_ROOM: 'leave-product-room',
} as const;

export type SocketEventType = (typeof SocketEvent)[keyof typeof SocketEvent];

export interface SocketEventPayloads {
	[SocketEvent.PRODUCT_CREATED]: Product;
	[SocketEvent.PRODUCT_UPDATED]: Product;
	[SocketEvent.PRODUCT_DELETED]: { id: string };
	[SocketEvent.CHAT_MESSAGE]: ChatMessage;
	[SocketEvent.CHAT_HISTORY]: { productId: string; messages: ChatMessage[] };
	[SocketEvent.SEND_MESSAGE]: {
		productId: string;
		message: string;
		username: string;
	};
	[SocketEvent.JOIN_PRODUCT_ROOM]: { productId: string };
	[SocketEvent.LEAVE_PRODUCT_ROOM]: { productId: string };
}
