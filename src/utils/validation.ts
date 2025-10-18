import * as yup from 'yup';
import { VALIDATION_REGEX, FIELD_LIMITS, VALIDATION_MESSAGES } from '../constants/validation';

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

export type LoginFormData = yup.InferType<typeof loginSchema>;
