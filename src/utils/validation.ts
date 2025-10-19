import * as yup from 'yup';
import { VALIDATION_REGEX, FIELD_LIMITS, VALIDATION_MESSAGES } from '../constants/validation';

export const productSchema = yup
	.object({
		title: yup
			.string()
			.transform((value) => value?.trim())
			.required(VALIDATION_MESSAGES.REQUIRED)
			.min(FIELD_LIMITS.TITLE.MIN, VALIDATION_MESSAGES.TOO_SHORT(FIELD_LIMITS.TITLE.MIN))
			.max(FIELD_LIMITS.TITLE.MAX, VALIDATION_MESSAGES.TOO_LONG(FIELD_LIMITS.TITLE.MAX))
			.matches(VALIDATION_REGEX.ALPHANUMERIC_LATIN, 'Title can only contain latin letters, numbers, and basic punctuation'),

		price: yup
			.number()
			.transform((value, originalValue) => {
				if (originalValue === '' || originalValue === null) return undefined;
				return value;
			})
			.required(VALIDATION_MESSAGES.REQUIRED)
			.positive('Price must be positive')
			.min(FIELD_LIMITS.PRICE.MIN, VALIDATION_MESSAGES.MIN_VALUE(FIELD_LIMITS.PRICE.MIN))
			.max(FIELD_LIMITS.PRICE.MAX, VALIDATION_MESSAGES.MAX_VALUE(FIELD_LIMITS.PRICE.MAX))
			.test('decimal-places', 'Price can have maximum 2 decimal places', (value) => {
				if (value === undefined) return true;
				return /^\d+(\.\d{1,2})?$/.test(value.toString());
			}),

		description: yup
			.string()
			.transform((value) => value?.trim())
			.required(VALIDATION_MESSAGES.REQUIRED)
			.min(FIELD_LIMITS.DESCRIPTION.MIN, VALIDATION_MESSAGES.TOO_SHORT(FIELD_LIMITS.DESCRIPTION.MIN))
			.max(FIELD_LIMITS.DESCRIPTION.MAX, VALIDATION_MESSAGES.TOO_LONG(FIELD_LIMITS.DESCRIPTION.MAX))
			.matches(VALIDATION_REGEX.ALPHANUMERIC_LATIN, 'Description can only contain latin letters, numbers, and basic punctuation'),

		category: yup
			.string()
			.transform((value) => value?.trim())
			.optional()
			.min(FIELD_LIMITS.CATEGORY.MIN, VALIDATION_MESSAGES.TOO_SHORT(FIELD_LIMITS.CATEGORY.MIN))
			.max(FIELD_LIMITS.CATEGORY.MAX, VALIDATION_MESSAGES.TOO_LONG(FIELD_LIMITS.CATEGORY.MAX))
			.matches(VALIDATION_REGEX.LATIN_ONLY, VALIDATION_MESSAGES.LATIN_ONLY),

		image: yup
			.string()
			.transform((value) => value?.trim())
			.optional()
			.min(FIELD_LIMITS.IMAGE_URL.MIN, VALIDATION_MESSAGES.TOO_SHORT(FIELD_LIMITS.IMAGE_URL.MIN))
			.max(FIELD_LIMITS.IMAGE_URL.MAX, VALIDATION_MESSAGES.TOO_LONG(FIELD_LIMITS.IMAGE_URL.MAX))
			.matches(VALIDATION_REGEX.URL, VALIDATION_MESSAGES.URL_INVALID),

		published: yup.boolean().required(VALIDATION_MESSAGES.REQUIRED),
	})
	.required();

export const loginSchema = yup
	.object({
		username: yup
			.string()
			.transform((value) => value?.trim())
			.required(VALIDATION_MESSAGES.REQUIRED)
			.min(FIELD_LIMITS.USERNAME.MIN, VALIDATION_MESSAGES.TOO_SHORT(FIELD_LIMITS.USERNAME.MIN))
			.max(FIELD_LIMITS.USERNAME.MAX, VALIDATION_MESSAGES.TOO_LONG(FIELD_LIMITS.USERNAME.MAX))
			.matches(VALIDATION_REGEX.LATIN_NO_SPACES, 'Username can only contain latin letters without spaces'),
	})
	.required();

export type ProductFormData = yup.InferType<typeof productSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
