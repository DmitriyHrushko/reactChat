import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string, formatStr = 'MMM dd, yyyy HH:mm'): string => {
	try {
		const date = parseISO(dateString);
		return format(date, formatStr);
	} catch (error) {
		console.error('Error formatting date:', error);
		return dateString;
	}
};

export const getCurrentISODate = (): string => {
	return new Date().toISOString();
};

export const formatPrice = (price: number, currency = '$'): string => {
	return `${currency}${price.toFixed(2)}`;
};

export const truncateText = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + '...';
};

export const generateSlug = (text: string): string => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
};

export const deepClone = <T>(obj: T): T => {
	return JSON.parse(JSON.stringify(obj));
};
