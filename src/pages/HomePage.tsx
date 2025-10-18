import { Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add, ShoppingCart } from '@mui/icons-material';

export const HomePage = () => {
	const navigate = useNavigate();

	return (
		<Container maxWidth='md'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '60vh',
					textAlign: 'center',
					gap: 3,
				}}
			>
				<Typography variant='h2' component='h1' gutterBottom>
					Product Manager Chat
				</Typography>
				<Typography variant='h5' color='text.secondary' paragraph>
					Manage your products with live updates and real-time chat
				</Typography>

				<Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
					<Button
						variant='contained'
						size='large'
						startIcon={<ShoppingCart />}
						onClick={() => navigate('/products')}
					>
						View Products
					</Button>

					<Button variant='outlined' size='large' startIcon={<Add />} onClick={() => navigate('/products/create')}>
						Create Product
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
