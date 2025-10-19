import { Typography, Button, Container, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add, ShoppingCart, Login } from '@mui/icons-material';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated, selectUsername } from '../features/auth/authSlice';

export const HomePage = () => {
	const navigate = useNavigate();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const username = useAppSelector(selectUsername);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: 'calc(100vh - 64px - 56px)',
				textAlign: 'center',
				gap: 3,
				px: 2,
			}}
		>
			<Container maxWidth='md'>
				{isAuthenticated && username && (
					<Alert severity='success' sx={{ width: '100%' }}>
						Welcome back, <strong>{username}</strong>!
					</Alert>
				)}

				<Typography variant='h2' component='h1' gutterBottom>
					Product Manager Chat
				</Typography>
				<Typography variant='h5' color='text.secondary'>
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

					<Button
						variant='outlined'
						size='large'
						startIcon={<Add />}
						onClick={() => navigate('/products/createProduct')}
					>
						Create Product
					</Button>

					{!isAuthenticated && (
						<Button
							variant='outlined'
							size='large'
							color='secondary'
							startIcon={<Login />}
							onClick={() => navigate('/login')}
						>
							Login
						</Button>
					)}
				</Box>
			</Container>
		</Box>
	);
};
