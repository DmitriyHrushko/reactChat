import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema, type ProductFormData } from '../utils/validation';
import type { Product } from '../types';

export const useProductForm = (defaultProduct?: Partial<Product>) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isDirty },
		setValue,
		watch,
	} = useForm<ProductFormData>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(productSchema) as any,
		defaultValues: {
			title: defaultProduct?.title || '',
			price: defaultProduct?.price || 0,
			description: defaultProduct?.description || '',
			category: defaultProduct?.category || '',
			image: defaultProduct?.image || '',
			published: defaultProduct?.published ?? true,
		},
	});

	return {
		control,
		handleSubmit,
		reset,
		errors,
		isSubmitting,
		isDirty,
		setValue,
		watch,
	};
};
