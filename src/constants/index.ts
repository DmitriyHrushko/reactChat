export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com';

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const PRODUCT_LIMITS = [8, 16, Infinity] as const;
export const ITEMS_PER_PAGE = 8;
export const DEFAULT_PRODUCT_LIMIT = 8;

export const STORAGE_KEYS = {
	REDUX_STATE: 'persist:root',
	USER_PREFERENCES: 'user-preferences',
} as const;

export const ROUTES = {
	HOME: '/',
	PRODUCTS: '/products',
	PRODUCT_DETAIL: '/products/:id',
	PRODUCT_CREATE: '/products/createProduct',
	PRODUCT_EDIT: '/products/:id/edit',
} as const;

export const SORT_OPTIONS = [
	{ value: 'title', label: 'Title' },
	{ value: 'price', label: 'Price' },
	{ value: 'createdAt', label: 'Date Created' },
] as const;

export * from './validation';
