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
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { formatDate, formatPrice } from '../../utils';

interface ProductTableProps {
	products: Product[];
	onDelete?: (id: string) => void;
	onTogglePublished?: (id: string) => void;
}

export const ProductTable = ({ products, onDelete, onTogglePublished }: ProductTableProps) => {
	const navigate = useNavigate();

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
						products.map((product) => (
							<TableRow key={product.id} hover>
								<TableCell>{product.title}</TableCell>
								<TableCell>{formatPrice(product.price)}</TableCell>
								<TableCell>{product.category && <Chip label={product.category} size='small' />}</TableCell>
								<TableCell>{formatDate(product.createdAt, 'MMM dd, yyyy')}</TableCell>
								<TableCell>
									{onTogglePublished ? (
										<Switch
											checked={product.published}
											onChange={() => onTogglePublished(product.id)}
											size='small'
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
										<IconButton size='small' onClick={() => navigate(`/products/${product.id}`)} title='View'>
											<Visibility />
										</IconButton>
										<IconButton
											size='small'
											onClick={() => navigate(`/products/${product.id}/edit`)}
											title='Edit'
										>
											<Edit />
										</IconButton>
										{onDelete && (
											<IconButton
												size='small'
												onClick={() => onDelete(product.id)}
												color='error'
												title='Delete'
											>
												<Delete />
											</IconButton>
										)}
									</Box>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
