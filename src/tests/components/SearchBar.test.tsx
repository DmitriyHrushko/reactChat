import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../../components/product/SearchBar';
import { useState } from 'react';

describe('SearchBar', () => {
	it('renders search input', () => {
		render(<SearchBar onSearch={vi.fn()} />);
		const input = screen.getByPlaceholderText(/search products/i);
		expect(input).toBeInTheDocument();
	});

	it('calls onSearch when typing', async () => {
		const onSearch = vi.fn();
		render(<SearchBar onSearch={onSearch} />);

		const input = screen.getByPlaceholderText(/search products/i);
		fireEvent.change(input, { target: { value: 'test' } });

		// The search is debounced, so we need to wait
		await new Promise((resolve) => setTimeout(resolve, 600));

		expect(onSearch).toHaveBeenCalledWith('test');
	});

	it('updates input value when typing', () => {
		const onSearch = vi.fn();
		render(<SearchBar onSearch={onSearch} />);

		const input = screen.getByPlaceholderText(/search products/i) as HTMLInputElement;
		fireEvent.change(input, { target: { value: 'test' } });

		expect(input.value).toBe('test');
	});

	it('reflects controlled value from parent', async () => {
		const Wrapper = () => {
			const [value, setValue] = useState('Men');
			return (
				<div>
					<button onClick={() => setValue('Women')}>switch</button>
					<SearchBar onSearch={vi.fn()} value={value} />
				</div>
			);
		};

		render(<Wrapper />);
		const input = screen.getByPlaceholderText(/search products/i) as HTMLInputElement;
		expect(input.value).toBe('Men');
		fireEvent.click(screen.getByText('switch'));
		expect(input.value).toBe('Women');
	});
});
