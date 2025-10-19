export interface Product {
	id: string;
	title: string;
	price: number;
	description: string;
	category?: string;
	image?: string;
	published: boolean;
	createdAt: string;
}

export interface CreateProductInput {
	title: string;
	price: number;
	description: string;
	category?: string;
	image?: string;
	published: boolean;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
	id: string;
}

export interface ProductFilters {
	searchQuery?: string;
	sortBy?: 'price' | 'title' | 'createdAt';
	sortOrder?: 'asc' | 'desc';
	published?: boolean;
}

export interface PaginationOptions {
	limit: number;
	offset: number;
}
