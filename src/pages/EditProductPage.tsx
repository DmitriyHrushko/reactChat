import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { Box, Typography, FormControlLabel, Switch, IconButton, Alert } from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectLocalProductById, updateLocalProduct } from '../features/products/productSlice';
import { FormField } from '../components/common/FormField';
import { ToastNotification } from '../components/common/ToastNotification';
import { useToast, useSocket, useProductForm } from '../hooks';
import { type ProductFormData } from '../utils/validation';
import { GradientButton, ElevatedCard, GradientText, FlexRow } from '../components/styled';

export const EditProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { toast, showSuccess, showError, closeToast } = useToast();
	const { emitProductUpdated } = useSocket();

	const product = useAppSelector(selectLocalProductById(id!));

	const { control, handleSubmit, reset, isSubmitting } = useProductForm(product);

	useEffect(() => {
		if (product) {
			reset({
				title: product.title,
				price: product.price,
				description: product.description,
				category: product.category || '',
				image: product.image || '',
				published: product.published,
			});
		}
	}, [product, reset]);

	if (!product) {
		return (
			<Box sx={{ textAlign: 'center', py: 8 }}>
				<Typography variant='h5' color='error' gutterBottom>
					Product not found or not editable
				</Typography>
				<Typography variant='body1' color='text.secondary' paragraph>
					Only local products can be edited
				</Typography>
				<GradientButton onClick={() => navigate('/products?tab=my')}>Back to My Products</GradientButton>
			</Box>
		);
	}

	const onSubmit = async (data: ProductFormData) => {
		try {
			const updatedProduct = {
				id: id!,
				title: data.title,
				price: data.price,
				description: data.description,
				category: data.category || undefined,
				image: data.image || undefined,
				published: data.published,
			};

			// Optimistic update
			dispatch(updateLocalProduct(updatedProduct));

			// Emit socket event
			emitProductUpdated({
				...product,
				...updatedProduct,
			});

			showSuccess('Product updated successfully!');
			setTimeout(() => navigate(`/products/${id}`), 1500);
		} catch (error) {
			showError('Failed to update product. Please try again.');
			console.error('Error updating product:', error);
		}
	};

	return (
		<Box>
			<FlexRow sx={{ mb: 3 }}>
				<IconButton onClick={() => navigate(-1)}>
					<ArrowBack />
				</IconButton>
				<GradientText variant='h4' component='h1'>
					Edit Product
				</GradientText>
			</FlexRow>

			<ElevatedCard sx={{ p: 3, maxWidth: 800 }}>
				<Alert severity='info' sx={{ mb: 3 }}>
					<Typography variant='subtitle2' gutterBottom>
						Validation Rules:
					</Typography>
					<Typography variant='body2'>
						• Title: 3-100 characters, latin letters, numbers, basic punctuation
						<br />
						• Price: $0.01-$999,999.99, max 2 decimal places
						<br />
						• Description: 10-500 characters, latin letters, numbers, basic punctuation
						<br />
						• Category: 2-50 characters, latin letters only (optional)
						<br />• Image: Valid URL starting with http:// or https:// (optional)
					</Typography>
				</Alert>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
						<FormField name='title' control={control} label='Title' required placeholder='Amazing Product' />

						<FormField
							name='price'
							control={control}
							label='Price'
							type='number'
							required
							placeholder='19.99'
							inputProps={{ step: '0.01', min: '0.01', max: '999999.99' }}
						/>

						<FormField
							name='description'
							control={control}
							label='Description'
							required
							multiline
							rows={4}
							placeholder='Detailed product description...'
						/>

						<FormField name='category' control={control} label='Category' placeholder='Electronics' />

						<FormField
							name='image'
							control={control}
							label='Image URL'
							placeholder='https://example.com/image.jpg'
						/>

						<Controller
							name='published'
							control={control}
							render={({ field }) => (
								<FormControlLabel control={<Switch {...field} checked={field.value} />} label='Published' />
							)}
						/>

						<FlexRow sx={{ justifyContent: 'flex-end' }}>
							<GradientButton variant='outlined' onClick={() => navigate(-1)} disabled={isSubmitting}>
								Cancel
							</GradientButton>
							<GradientButton type='submit' disabled={isSubmitting} startIcon={<Save />}>
								{isSubmitting ? 'Saving...' : 'Save Changes'}
							</GradientButton>
						</FlexRow>
					</Box>
				</form>
			</ElevatedCard>

			<ToastNotification open={toast.open} message={toast.message} severity={toast.severity} onClose={closeToast} />
		</Box>
	);
};
