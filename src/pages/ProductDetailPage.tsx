import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Chip, Tabs, Tab, Divider, IconButton } from '@mui/material';
import { Edit, Delete, Add, ArrowBack } from '@mui/icons-material';
import { useGetProductByIdQuery } from '../services/productApi';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectLocalProductById, deleteLocalProduct, addRemoteToLocal } from '../features/products/productSlice';
import { ChatBox } from '../components/chat/ChatBox';
import { ProductDetailSkeleton } from '../components/common/LoadingSkeletons';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { ToastNotification } from '../components/common/ToastNotification';
import { useConfirmDialog, useToast } from '../hooks';
import { formatPrice, formatDate } from '../utils';

/**
 * Product detail page with Details and Chat tabs
 */
export const ProductDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [activeTab, setActiveTab] = useState(0);

	const confirmDialog = useConfirmDialog();
	const { toast, showSuccess, closeToast } = useToast();

	// Try to get from local first, then from API
	const localProduct = useAppSelector(selectLocalProductById(id!));
	const {
		data: remoteProduct,
		isLoading,
		error,
	} = useGetProductByIdQuery(id!, {
		skip: !!localProduct, // Skip API call if product is local
	});

	const product = localProduct || remoteProduct;
	const isLocal = !!localProduct;

	const handleDelete = async () => {
		const confirmed = await confirmDialog.open(
			'Delete Product',
			'Are you sure you want to delete this product? This action cannot be undone.'
		);

		if (confirmed && id) {
			dispatch(deleteLocalProduct(id));
			showSuccess('Product deleted successfully');
			navigate('/products?tab=my');
		}
	};

	const handleAddToMyProducts = () => {
		if (product) {
			dispatch(addRemoteToLocal(product));
			showSuccess('Product added to My Products');
		}
	};

	if (isLoading) {
		return <ProductDetailSkeleton />;
	}

	if (error || !product) {
		return (
			<Box sx={{ textAlign: 'center', py: 8 }}>
				<Typography variant='h5' color='error' gutterBottom>
					Product not found
				</Typography>
				<Button onClick={() => navigate('/products')}>Back to Products</Button>
			</Box>
		);
	}

	return (
		<Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
			<Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
				<IconButton onClick={() => navigate(-1)}>
					<ArrowBack />
				</IconButton>
				<Typography variant='h4' component='h1' sx={{ flex: 1 }}>
					Product Details
				</Typography>
				{isLocal ? (
					<>
						<Button variant='outlined' startIcon={<Edit />} onClick={() => navigate(`/products/${id}/edit`)}>
							Edit
						</Button>
						<Button variant='outlined' color='error' startIcon={<Delete />} onClick={handleDelete}>
							Delete
						</Button>
					</>
				) : (
					<Button variant='contained' startIcon={<Add />} onClick={handleAddToMyProducts}>
						Add to My Products
					</Button>
				)}
			</Box>

			<Paper sx={{ mb: 3 }}>
				<Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
					<Tab label='Details' />
					<Tab label='Chat' />
				</Tabs>
			</Paper>

			{activeTab === 0 && (
				<Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
					<Box
						component='img'
						src={product.image || 'https://via.placeholder.com/400'}
						alt={product.title}
						sx={{
							width: { xs: '100%', md: 400 },
							height: 400,
							objectFit: 'contain',
							bgcolor: 'background.default',
							borderRadius: 1,
							p: 2,
						}}
					/>
					<Box sx={{ flex: 1 }}>
						<Typography variant='h4' gutterBottom>
							{product.title}
						</Typography>
						<Typography variant='h5' color='primary' gutterBottom>
							{formatPrice(product.price)}
						</Typography>
						<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
							{product.category && <Chip label={product.category} />}
							<Chip
								label={product.published ? 'Published' : 'Draft'}
								color={product.published ? 'success' : 'default'}
							/>
							{isLocal && <Chip label='Local Product' color='info' />}
						</Box>
						<Divider sx={{ my: 2 }} />
						<Typography variant='body1' paragraph>
							{product.description}
						</Typography>
						<Divider sx={{ my: 2 }} />
						<Typography variant='body2' color='text.secondary'>
							<strong>Product ID:</strong> {product.id}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							<strong>Created:</strong> {formatDate(product.createdAt)}
						</Typography>
					</Box>
				</Box>
			)}

			{activeTab === 1 && id && <ChatBox productId={id} />}

			<ConfirmDialog
				open={confirmDialog.isOpen}
				title={confirmDialog.title}
				message={confirmDialog.message}
				onConfirm={confirmDialog.confirm}
				onCancel={confirmDialog.cancel}
			/>

			<ToastNotification open={toast.open} message={toast.message} severity={toast.severity} onClose={closeToast} />
		</Box>
	);
};
