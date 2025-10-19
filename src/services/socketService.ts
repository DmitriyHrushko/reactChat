import { io, type Socket } from 'socket.io-client';
import { SocketEvent, type SocketEventPayloads } from '../types';

export const socket: Socket = io(import.meta.env.SOCKET_URL, {
	transports: ['websocket', 'polling'],
	reconnection: true,
	reconnectionDelay: 1000,
	reconnectionAttempts: 5,
	autoConnect: false,
});

// Connection event listeners
socket.on(SocketEvent.CONNECT, () => {
	console.log('✅ Socket connected:', socket.id);
});

socket.on(SocketEvent.DISCONNECT, () => {
	console.log('❌ Socket disconnected');
});

socket.on('connect_error', (error) => {
	console.error('🔴 Socket connection error:', error);
});

// Helper functions
export const connectSocket = (): void => {
	if (!socket.connected) {
		socket.connect();
		console.log('🔌 Connecting socket...');
	}
};

export const disconnectSocket = (): void => {
	if (socket.connected) {
		socket.disconnect();
		console.log('🔌 Disconnecting socket...');
	}
};

export const isSocketConnected = (): boolean => {
	return socket.connected;
};

// Room management
export const joinProductRoom = (productId: string): void => {
	socket.emit(SocketEvent.JOIN_PRODUCT_ROOM, { productId });
	console.log(`📥 Joining room: product-${productId}`);
};

export const leaveProductRoom = (productId: string): void => {
	socket.emit(SocketEvent.LEAVE_PRODUCT_ROOM, { productId });
	console.log(`📤 Leaving room: product-${productId}`);
};

// Chat message
export const sendChatMessage = (productId: string, message: string, username: string): void => {
	socket.emit(SocketEvent.SEND_MESSAGE, {
		productId,
		message,
		username,
	});
	console.log('📨 Sending message:', { productId, message, username });
};

// Product events
export const emitProductCreated = (product: SocketEventPayloads[typeof SocketEvent.PRODUCT_CREATED]): void => {
	socket.emit(SocketEvent.PRODUCT_CREATED, product);
};

export const emitProductUpdated = (product: SocketEventPayloads[typeof SocketEvent.PRODUCT_UPDATED]): void => {
	socket.emit(SocketEvent.PRODUCT_UPDATED, product);
};

export const emitProductDeleted = (id: string): void => {
	socket.emit(SocketEvent.PRODUCT_DELETED, { id });
};

export default socket;
