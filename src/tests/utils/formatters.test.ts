import { describe, it, expect } from 'vitest';
import { formatPrice, formatDate, truncateText } from '../../utils/formatters';

describe('Formatters Utility Functions', () => {
	describe('formatPrice', () => {
		it('formats price with dollar sign and 2 decimals', () => {
			expect(formatPrice(29.99)).toBe('$29.99');
			expect(formatPrice(100)).toBe('$100.00');
			expect(formatPrice(0.99)).toBe('$0.99');
		});
	});

	describe('formatDate', () => {
		it('formats date string correctly', () => {
			const result = formatDate('2024-01-15T12:00:00.000Z', 'MMM dd, yyyy');
			expect(result).toMatch(/Jan 15, 2024/);
		});

		it('returns original string for invalid date', () => {
			const result = formatDate('invalid-date', 'MMM dd, yyyy');
			expect(result).toBe('invalid-date');
		});
	});

	describe('truncateText', () => {
		it('truncates text longer than maxLength', () => {
			const longText = 'This is a very long text that should be truncated';
			const result = truncateText(longText, 20);
			expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
			expect(result).toContain('...');
		});

		it('returns original text if shorter than maxLength', () => {
			const shortText = 'Short text';
			const result = truncateText(shortText, 50);
			expect(result).toBe(shortText);
		});

		it('returns empty string for empty input', () => {
			const result = truncateText('', 20);
			expect(result).toBe('');
		});
	});
});
