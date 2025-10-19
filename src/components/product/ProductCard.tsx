import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { formatPrice, truncateText } from '../../utils';

interface ProductCardProps {
	product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/products/${product.id}`);
	};

	return (
		<Card
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				cursor: 'pointer',
				'&:hover': {
					boxShadow: 6,
					transform: 'translateY(-4px)',
					transition: 'all 0.3s',
				},
			}}
			onClick={handleClick}
		>
			<CardMedia
				component='img'
				height='200'
				image={product.image || 'https://via.placeholder.com/200'}
				alt={product.title}
				sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.default' }}
			/>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography gutterBottom variant='h6' component='h2' noWrap>
					{product.title}
				</Typography>
				<Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
					{truncateText(product.description, 100)}
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
					<Typography variant='h6' color='primary'>
						{formatPrice(product.price)}
					</Typography>
					{product.category && <Chip label={product.category} size='small' />}
				</Box>
				{!product.published && <Chip label='Draft' size='small' color='warning' sx={{ mt: 1 }} />}
			</CardContent>
			<CardActions>
				<Button
					size='small'
					fullWidth
					onClick={(e) => {
						e.stopPropagation();
						handleClick();
					}}
				>
					View Details
				</Button>
			</CardActions>
		</Card>
	);
};
