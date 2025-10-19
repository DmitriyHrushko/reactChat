export interface ChatMessage {
	id: string;
	productId: string;
	userId: string;
	username: string;
	message: string;
	timestamp: string;
}

export interface CreateMessageInput {
	productId: string;
	message: string;
	username: string;
}

export interface ChatState {
	messagesByProduct: Record<string, ChatMessage[]>;
}
