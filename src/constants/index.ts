export const PRODUCT_LIMITS = [8, 16, Infinity] as const;
export const DEFAULT_PRODUCT_LIMIT = 8;

export const SORT_OPTIONS = [
	{ value: 'title', label: 'Title' },
	{ value: 'price', label: 'Price' },
	{ value: 'createdAt', label: 'Date Created' },
] as const;

export * from './validation';
