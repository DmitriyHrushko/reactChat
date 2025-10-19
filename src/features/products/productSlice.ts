import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { Product, CreateProductInput, UpdateProductInput } from '../../types';
import { getCurrentISODate } from '../../utils';

interface LocalProductsState {
	products: Product[];
}

const initialState: LocalProductsState = {
	products: [],
};

const productSlice = createSlice({
	name: 'localProducts',
	initialState,
	reducers: {
		addLocalProduct: (state, action: PayloadAction<CreateProductInput>) => {
			const newProduct: Product = {
				...action.payload,
				id: uuidv4(),
				createdAt: getCurrentISODate(),
			};
			state.products.unshift(newProduct);
		},

		updateLocalProduct: (state, action: PayloadAction<UpdateProductInput>) => {
			const index = state.products.findIndex((p) => p.id === action.payload.id);
			if (index !== -1) {
				state.products[index] = {
					...state.products[index],
					...action.payload,
				};
			}
		},

		deleteLocalProduct: (state, action: PayloadAction<string>) => {
			state.products = state.products.filter((p) => p.id !== action.payload);
		},

		togglePublished: (state, action: PayloadAction<string>) => {
			const product = state.products.find((p) => p.id === action.payload);
			if (product) {
				product.published = !product.published;
			}
		},

		addRemoteToLocal: (state, action: PayloadAction<Product>) => {
			// Check if product already exists
			const exists = state.products.some((p) => p.id === action.payload.id);
			if (!exists) {
				state.products.unshift(action.payload);
			}
		},

		clearLocalProducts: (state) => {
			state.products = [];
		},
	},
});

export const {
	addLocalProduct,
	updateLocalProduct,
	deleteLocalProduct,
	togglePublished,
	addRemoteToLocal,
	clearLocalProducts,
} = productSlice.actions;

export default productSlice.reducer;

// Selectors
export const selectAllLocalProducts = (state: { localProducts: LocalProductsState }) => state.localProducts.products;

export const selectLocalProductById = (productId: string) => (state: { localProducts: LocalProductsState }) =>
	state.localProducts.products.find((p) => p.id === productId);

export const selectPublishedLocalProducts = (state: { localProducts: LocalProductsState }) =>
	state.localProducts.products.filter((p) => p.published);
