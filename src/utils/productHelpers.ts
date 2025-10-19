import type { Product, ProductFilters } from '../types';

export const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
	let filtered = [...products];

	// Filter by search query
	if (filters.searchQuery) {
		const query = filters.searchQuery.toLowerCase();
		filtered = filtered.filter(
			(product) =>
				product.title.toLowerCase().includes(query) ||
				product.description.toLowerCase().includes(query) ||
				product.category?.toLowerCase().includes(query)
		);
	}

	// Filter by published status
	if (filters.published !== undefined) {
		filtered = filtered.filter((product) => product.published === filters.published);
	}

	return filtered;
};

export const sortProducts = (
	products: Product[],
	sortBy: ProductFilters['sortBy'] = 'createdAt',
	sortOrder: ProductFilters['sortOrder'] = 'desc'
): Product[] => {
	const sorted = [...products];

	sorted.sort((a, b) => {
		let comparison = 0;

		switch (sortBy) {
			case 'price':
				comparison = a.price - b.price;
				break;
			case 'title':
				comparison = a.title.localeCompare(b.title);
				break;
			case 'createdAt':
				comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
				break;
			default:
				comparison = 0;
		}

		return sortOrder === 'asc' ? comparison : -comparison;
	});

	return sorted;
};

export const filterAndSortProducts = (products: Product[], filters: ProductFilters): Product[] => {
	const filtered = filterProducts(products, filters);
	return sortProducts(filtered, filters.sortBy, filters.sortOrder);
};
