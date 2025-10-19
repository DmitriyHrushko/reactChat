import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Chip,
	Switch,
	Box,
	TextField,
	Tooltip,
} from '@mui/material';
import { Edit, Delete, Visibility, Save, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Product } from '../../types';
import { formatDate, formatPrice } from '../../utils';
import { HighlightedText } from '../common';

interface ProductTableProps {
	products: Product[];
	onDelete?: (id: string) => void;
	onTogglePublished?: (id: string) => void;
	onUpdate?: (id: string, updates: Partial<Product>) => void;
	searchQuery?: string;
}

export const ProductTable = ({
	products,
	onDelete,
	onTogglePublished,
	onUpdate,
	searchQuery = '',
}: ProductTableProps) => {
	const navigate = useNavigate();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});

	const handleStartEdit = (product: Product) => {
		setEditingId(product.id);
		setEditedProduct({
			title: product.title,
			price: product.price,
			category: product.category,
		});
	};

	const handleSaveEdit = (id: string) => {
		if (onUpdate) {
			onUpdate(id, editedProduct);
		}
		setEditingId(null);
		setEditedProduct({});
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setEditedProduct({});
	};

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Category</TableCell>
						<TableCell>Created</TableCell>
						<TableCell>Published</TableCell>
						<TableCell align='right'>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products.length === 0 ? (
						<TableRow>
							<TableCell colSpan={6} align='center'>
								No products found
							</TableCell>
						</TableRow>
					) : (
						products.map((product) => {
							const isEditing = editingId === product.id;

							return (
								<TableRow key={product.id} hover>
									<TableCell>
										{isEditing ? (
											<TextField
												size='small'
												value={editedProduct.title || ''}
												onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
												fullWidth
											/>
										) : (
											<HighlightedText text={product.title} searchQuery={searchQuery} />
										)}
									</TableCell>
									<TableCell>
										{isEditing ? (
											<TextField
												size='small'
												type='number'
												value={editedProduct.price || ''}
												onChange={(e) =>
													setEditedProduct({ ...editedProduct, price: Number(e.target.value) })
												}
												inputProps={{ step: '0.01', min: '0.01' }}
												sx={{ width: 120 }}
											/>
										) : (
											formatPrice(product.price)
										)}
									</TableCell>
									<TableCell>
										{isEditing ? (
											<TextField
												size='small'
												value={editedProduct.category || ''}
												onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
												sx={{ width: 150 }}
											/>
										) : (
											product.category && <Chip label={product.category} size='small' />
										)}
									</TableCell>
									<TableCell>{formatDate(product.createdAt, 'MMM dd, yyyy')}</TableCell>
									<TableCell>
										{onTogglePublished ? (
											<Switch
												checked={product.published}
												onChange={() => onTogglePublished(product.id)}
												size='small'
												disabled={isEditing}
											/>
										) : (
											<Chip
												label={product.published ? 'Published' : 'Draft'}
												color={product.published ? 'success' : 'default'}
												size='small'
											/>
										)}
									</TableCell>
									<TableCell align='right'>
										<Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
											{isEditing ? (
												<>
													<Tooltip title='Save'>
														<IconButton
															size='small'
															onClick={() => handleSaveEdit(product.id)}
															color='primary'
														>
															<Save />
														</IconButton>
													</Tooltip>
													<Tooltip title='Cancel'>
														<IconButton size='small' onClick={handleCancelEdit}>
															<Cancel />
														</IconButton>
													</Tooltip>
												</>
											) : (
												<>
													<Tooltip title='View Details'>
														<IconButton size='small' onClick={() => navigate(`/products/${product.id}`)}>
															<Visibility />
														</IconButton>
													</Tooltip>
													{onUpdate && (
														<Tooltip title='Edit Inline'>
															<IconButton size='small' onClick={() => handleStartEdit(product)}>
																<Edit />
															</IconButton>
														</Tooltip>
													)}
													{onDelete && (
														<Tooltip title='Delete'>
															<IconButton
																size='small'
																onClick={() => onDelete(product.id)}
																color='error'
															>
																<Delete />
															</IconButton>
														</Tooltip>
													)}
												</>
											)}
										</Box>
									</TableCell>
								</TableRow>
							);
						})
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
