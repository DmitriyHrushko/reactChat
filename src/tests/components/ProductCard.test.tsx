import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from '../../components/product/ProductCard';
import type { Product } from '../../types';

const mockProduct: Product = {
	id: '1',
	title: 'Test Product',
	price: 29.99,
	description: 'This is a test product description',
	category: 'electronics',
	image: 'https://via.placeholder.com/200',
	published: true,
	createdAt: '2024-01-01T00:00:00.000Z',
};

describe('ProductCard', () => {
	it('renders product information correctly', () => {
		render(
			<BrowserRouter>
				<ProductCard product={mockProduct} />
			</BrowserRouter>
		);

		expect(screen.getByText('Test Product')).toBeInTheDocument();
		expect(screen.getByText(/29.99/)).toBeInTheDocument();
		expect(screen.getByText('electronics')).toBeInTheDocument();
	});

	it('highlights search query in title and description', () => {
		render(
			<BrowserRouter>
				<ProductCard product={mockProduct} searchQuery='Test' />
			</BrowserRouter>
		);

		// Check that "Test" appears in the document (it's in "Test Product")
		const matches = screen.getAllByText('Test');
		expect(matches.length).toBeGreaterThan(0);
	});

	it('shows draft chip when product is not published', () => {
		const draftProduct = { ...mockProduct, published: false };
		render(
			<BrowserRouter>
				<ProductCard product={draftProduct} />
			</BrowserRouter>
		);

		expect(screen.getByText('Draft')).toBeInTheDocument();
	});
});
