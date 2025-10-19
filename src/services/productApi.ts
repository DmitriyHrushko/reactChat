import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../types';

interface FakeStoreProduct {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating?: {
		rate: number;
		count: number;
	};
}

const transformFakeStoreProduct = (product: FakeStoreProduct): Product => ({
	id: product.id.toString(),
	title: product.title,
	price: product.price,
	description: product.description,
	category: product.category,
	image: product.image,
	published: true,
	createdAt: new Date().toISOString(),
});

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.API_BASE_URL }),
	tagTypes: ['Product'],
	endpoints: (builder) => ({
		getProducts: builder.query<Product[], number | undefined>({
			query: (limit) => (limit ? `/products?limit=${limit}` : '/products'),
			transformResponse: (response: FakeStoreProduct[]) => response.map(transformFakeStoreProduct),
			providesTags: (result) =>
				result
					? [...result.map(({ id }) => ({ type: 'Product' as const, id })), { type: 'Product', id: 'LIST' }]
					: [{ type: 'Product', id: 'LIST' }],
		}),

		getProductById: builder.query<Product, string>({
			query: (id) => `/products/${id}`,
			transformResponse: (response: FakeStoreProduct) => transformFakeStoreProduct(response),
			providesTags: (_result, _error, id) => [{ type: 'Product', id }],
		}),

		getProductsByCategory: builder.query<Product[], string>({
			query: (category) => `/products/category/${category}`,
			transformResponse: (response: FakeStoreProduct[]) => response.map(transformFakeStoreProduct),
			providesTags: (result) =>
				result
					? [...result.map(({ id }) => ({ type: 'Product' as const, id })), { type: 'Product', id: 'LIST' }]
					: [{ type: 'Product', id: 'LIST' }],
		}),

		getCategories: builder.query<string[], void>({
			query: () => '/products/categories',
		}),

		createProduct: builder.mutation<Product, Partial<Product>>({
			query: (product) => ({
				url: '/products',
				method: 'POST',
				body: product,
			}),
			transformResponse: (response: FakeStoreProduct) => transformFakeStoreProduct(response),
			invalidatesTags: [{ type: 'Product', id: 'LIST' }],
		}),

		updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>({
			query: ({ id, ...patch }) => ({
				url: `/products/${id}`,
				method: 'PATCH',
				body: patch,
			}),
			transformResponse: (response: FakeStoreProduct) => transformFakeStoreProduct(response),
			invalidatesTags: (_result, _error, { id }) => [{ type: 'Product', id }],
		}),

		deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
			query: (id) => ({
				url: `/products/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (_result, _error, id) => [{ type: 'Product', id }],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useGetProductsByCategoryQuery,
	useGetCategoriesQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productApi;
