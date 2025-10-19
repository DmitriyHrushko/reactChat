export const VALIDATION_REGEX = {
	LATIN_ONLY: /^[A-Za-z\s'-]*$/,
	LATIN_NO_SPACES: /^[A-Za-z]+$/,
	NUMBERS_ONLY: /^\d*\.?\d*$/,
	URL: /^https?:\/\/.+\..+/,
		ALPHANUMERIC_LATIN: /^[A-Za-z0-9\s.,!?:;"'()\-–%&]*$/,
} as const;

export const FIELD_LIMITS = {
	USERNAME: {
		MIN: 3,
		MAX: 20,
	},
	TITLE: {
		MIN: 3,
		MAX: 100,
	},
	DESCRIPTION: {
		MIN: 10,
		MAX: 500,
	},
	CATEGORY: {
		MIN: 2,
		MAX: 50,
	},
	PRICE: {
		MIN: 0.01,
		MAX: 999999.99,
	},
	IMAGE_URL: {
		MIN: 10,
		MAX: 500,
	},
} as const;

export const VALIDATION_MESSAGES = {
	REQUIRED: 'This field is required',
	LATIN_ONLY: 'Only latin letters are allowed',
	NUMBERS_ONLY: 'Only numbers are allowed',
	URL_INVALID: 'Please enter a valid URL',
	TOO_SHORT: (min: number) => `Must be at least ${min} characters`,
	TOO_LONG: (max: number) => `Must be no more than ${max} characters`,
	MIN_VALUE: (min: number) => `Must be at least ${min}`,
	MAX_VALUE: (max: number) => `Must be no more than ${max}`,
	INVALID_FORMAT: 'Invalid format',
} as const;
