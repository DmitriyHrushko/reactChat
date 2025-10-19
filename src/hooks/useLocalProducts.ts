import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectAllLocalProducts } from '../features/products/productSlice';
import type { Product, ProductFilters } from '../types';
import { filterAndSortProducts } from '../utils';

export const useLocalProducts = (filters?: ProductFilters): Product[] => {
	const localProducts = useAppSelector(selectAllLocalProducts);

	return useMemo(() => {
		if (!filters) return localProducts;
		return filterAndSortProducts(localProducts, filters);
	}, [localProducts, filters]);
};
