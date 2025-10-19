import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Tabs, Tab, Button, ButtonGroup, Typography, Paper, CircularProgress } from '@mui/material';
import { useGetProductsQuery } from '../services/productApi';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
	selectAllLocalProducts,
	deleteLocalProduct,
	togglePublished,
	updateLocalProduct,
	restoreLocalProduct,
} from '../features/products/productSlice';
import { ProductCard } from '../components/product/ProductCard';
import { ProductTable } from '../components/product/ProductTable';
import { SearchBar } from '../components/product/SearchBar';
import { SortSelect } from '../components/product/SortSelect';
import { ProductGridSkeleton } from '../components/common/LoadingSkeletons';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { ToastNotification } from '../components/common/ToastNotification';
import { UndoSnackbar } from '../components/common/UndoSnackbar';
import { useConfirmDialog, useToast, useInfiniteScroll, useUndoDelete } from '../hooks';
import { filterAndSortProducts } from '../utils';
import { DEFAULT_PRODUCT_LIMIT, ITEMS_PER_PAGE, PRODUCT_LIMITS } from '../constants';
import type { ProductFilters, Product } from '../types';

export const ProductsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();

	const activeTab = searchParams.get('tab') || 'remote';
	const [productLimit, setProductLimit] = useState<number>(DEFAULT_PRODUCT_LIMIT);
	const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

	// Separate filters for remote and local products
	const [remoteFilters, setRemoteFilters] = useState<ProductFilters>({
		searchQuery: '',
		sortBy: 'createdAt',
		sortOrder: 'desc',
		published: undefined,
	});

	const [localFilters, setLocalFilters] = useState<ProductFilters>({
		searchQuery: '',
		sortBy: 'createdAt',
		sortOrder: 'desc',
		published: undefined,
	});

	const {
		data: remoteProducts = [],
		isLoading,
		error,
	} = useGetProductsQuery(productLimit === Infinity ? undefined : productLimit);
	const localProducts = useAppSelector(selectAllLocalProducts);

	const confirmDialog = useConfirmDialog();
	const { toast, showSuccess, closeToast } = useToast();
	const undoDelete = useUndoDelete();

	// Filter and sort products
	const filteredRemoteProducts = useMemo(
		() => filterAndSortProducts(remoteProducts, remoteFilters),
		[remoteProducts, remoteFilters]
	);

	const filteredLocalProducts = useMemo(
		() => filterAndSortProducts(localProducts, localFilters),
		[localProducts, localFilters]
	);

	// Displayed products for infinite scroll
	const displayedRemoteProducts = useMemo(() => {
		return filteredRemoteProducts.slice(0, displayCount);
	}, [filteredRemoteProducts, displayCount]);

	const hasMore = displayCount < filteredRemoteProducts.length;
	const loadMoreProducts = useCallback(() => {
		setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
	}, []);

	// Infinite scroll ref
	const loadMoreRef = useInfiniteScroll({
		onLoadMore: loadMoreProducts,
		hasMore,
		isLoading: false,
	});

	const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
		setSearchParams({ tab: newValue });
		setDisplayCount(ITEMS_PER_PAGE); // Reset display count
	};

	const handleDelete = async (id: string) => {
		const confirmed = await confirmDialog.open('Delete Product', 'Are you sure you want to delete this product?');

		if (confirmed) {
			// Find product before deleting
			const productToDelete = localProducts.find((p) => p.id === id);

			if (productToDelete) {
				undoDelete.handleDelete(
					productToDelete,
					() => {
						dispatch(deleteLocalProduct(id));
					},
					5000 // 5 seconds to undo
				);
			}
		}
	};

	const handleUndoDelete = () => {
		undoDelete.handleUndo((product) => {
			dispatch(restoreLocalProduct(product));
			showSuccess('Product restored successfully');
		});
	};

	const handleTogglePublished = (id: string) => {
		dispatch(togglePublished(id));
	};

	const handleUpdate = (id: string, updates: Partial<Product>) => {
		dispatch(updateLocalProduct({ id, ...updates }));
		showSuccess('Product updated successfully');
	};

	// Handlers for remote products
	const handleRemoteSearch = useCallback((query: string) => {
		setRemoteFilters((prev) => ({ ...prev, searchQuery: query }));
		setDisplayCount(ITEMS_PER_PAGE);
	}, []);

	const handleRemoteSortByChange = useCallback((sortBy: ProductFilters['sortBy']) => {
		setRemoteFilters((prev) => ({ ...prev, sortBy }));
	}, []);

	const handleRemoteSortOrderChange = useCallback((sortOrder: ProductFilters['sortOrder']) => {
		setRemoteFilters((prev) => ({ ...prev, sortOrder }));
	}, []);

	// Handlers for local products
	const handleLocalSearch = useCallback((query: string) => {
		setLocalFilters((prev) => ({ ...prev, searchQuery: query }));
	}, []);

	const handleLocalSortByChange = useCallback((sortBy: ProductFilters['sortBy']) => {
		setLocalFilters((prev) => ({ ...prev, sortBy }));
	}, []);

	const handleLocalSortOrderChange = useCallback((sortOrder: ProductFilters['sortOrder']) => {
		setLocalFilters((prev) => ({ ...prev, sortOrder }));
	}, []);

	return (
		<Box>
			<Box sx={{ mb: 4 }}>
				<Typography variant='h4' component='h1' gutterBottom>
					Products
				</Typography>
				<Typography variant='body1' color='text.secondary'>
					Browse remote products or manage your own
				</Typography>
			</Box>

			<Paper sx={{ mb: 3 }}>
				<Tabs value={activeTab} onChange={handleTabChange}>
					<Tab label='Remote Products' value='remote' />
					<Tab label={`My Products (${localProducts.length})`} value='my' />
				</Tabs>
			</Paper>

			<Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
				<Box sx={{ flex: 1, minWidth: 200 }}>
					<SearchBar
						key={activeTab}
						onSearch={activeTab === 'remote' ? handleRemoteSearch : handleLocalSearch}
						value={activeTab === 'remote' ? remoteFilters.searchQuery : localFilters.searchQuery}
					/>
				</Box>
				<SortSelect
					sortBy={activeTab === 'remote' ? remoteFilters.sortBy : localFilters.sortBy}
					sortOrder={activeTab === 'remote' ? remoteFilters.sortOrder : localFilters.sortOrder}
					onSortByChange={activeTab === 'remote' ? handleRemoteSortByChange : handleLocalSortByChange}
					onSortOrderChange={activeTab === 'remote' ? handleRemoteSortOrderChange : handleLocalSortOrderChange}
				/>
				{activeTab === 'remote' && (
					<ButtonGroup variant='outlined' size='small'>
						{PRODUCT_LIMITS.map((limit) => (
							<Button
								key={limit}
								variant={productLimit === limit ? 'contained' : 'outlined'}
								onClick={() => {
									setProductLimit(limit);
									setDisplayCount(ITEMS_PER_PAGE);
								}}
							>
								{limit === Infinity ? 'All' : limit}
							</Button>
						))}
					</ButtonGroup>
				)}
			</Box>

			{activeTab === 'remote' && (
				<>
					{isLoading && <ProductGridSkeleton count={ITEMS_PER_PAGE} />}
					{error && <Typography color='error'>Error loading products. Please try again.</Typography>}
					{!isLoading && !error && (
						<>
							<Box
								sx={{
									display: 'grid',
									gridTemplateColumns: {
										xs: '1fr',
										sm: 'repeat(2, 1fr)',
										md: 'repeat(3, 1fr)',
										lg: 'repeat(4, 1fr)',
									},
									gap: 3,
									mb: 4,
								}}
							>
								{displayedRemoteProducts.map((product) => (
									<ProductCard key={product.id} product={product} searchQuery={remoteFilters.searchQuery} />
								))}
							</Box>

							{/* Infinite scroll trigger */}
							{hasMore && (
								<Box
									ref={loadMoreRef}
									sx={{
										display: 'flex',
										justifyContent: 'center',
										py: 4,
									}}
								>
									<CircularProgress />
								</Box>
							)}

							{!hasMore && displayedRemoteProducts.length > 0 && (
								<Typography align='center' color='text.secondary' sx={{ py: 4 }}>
									🎉 All products loaded! ({displayedRemoteProducts.length} total)
								</Typography>
							)}
						</>
					)}
					{!isLoading && !error && displayedRemoteProducts.length === 0 && (
						<Typography align='center' color='text.secondary' sx={{ py: 8 }}>
							No products found
						</Typography>
					)}
				</>
			)}

			{activeTab === 'my' && (
				<>
					<ProductTable
						products={filteredLocalProducts}
						onDelete={handleDelete}
						onTogglePublished={handleTogglePublished}
						onUpdate={handleUpdate}
						searchQuery={localFilters.searchQuery}
					/>
					{filteredLocalProducts.length === 0 && (
						<Typography align='center' color='text.secondary' sx={{ py: 8 }}>
							No products found. Create your first product!
						</Typography>
					)}
				</>
			)}

			<ConfirmDialog
				open={confirmDialog.isOpen}
				title={confirmDialog.title}
				message={confirmDialog.message}
				onConfirm={confirmDialog.confirm}
				onCancel={confirmDialog.cancel}
			/>

			<ToastNotification open={toast.open} message={toast.message} severity={toast.severity} onClose={closeToast} />

			<UndoSnackbar
				open={undoDelete.canUndo}
				message={`Product "${undoDelete.deletedProduct?.title}" deleted`}
				onUndo={handleUndoDelete}
				onClose={undoDelete.clearUndo}
				autoHideDuration={5000}
			/>
		</Box>
	);
};
