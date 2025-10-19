export const isValidImageUrl = (url: string): boolean => {
	try {
		new URL(url);
		return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
	} catch {
		return false;
	}
};

export const isValidUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

export const safeJsonParse = <T>(json: string, fallback: T): T => {
	try {
		return JSON.parse(json) as T;
	} catch {
		return fallback;
	}
};
