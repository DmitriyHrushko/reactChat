import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, Add, Inventory, Logout } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout, selectIsAuthenticated, selectUsername } from '../features/auth/authSlice';

export const MainLayout = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const username = useAppSelector(selectUsername);

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			{/* Header */}
			<AppBar
				position='fixed'
				sx={{
					top: 0,
					left: 0,
					right: 0,
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
			>
				<Toolbar sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
					<ShoppingCart sx={{ mr: 2 }} />
					<Typography
						variant='h6'
						component='div'
						sx={{
							flexGrow: 1,
							fontWeight: 600,
							fontSize: { xs: '1rem', sm: '1.25rem' },
						}}
					>
						Product Manager
					</Typography>

					<Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
						<Button
							color='inherit'
							onClick={() => navigate('/')}
							startIcon={<Home />}
							sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
						>
							Home
						</Button>
						<Button
							color='inherit'
							onClick={() => navigate('/products')}
							startIcon={<ShoppingCart />}
							sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
						>
							Products
						</Button>
						<Button
							color='inherit'
							onClick={() => navigate('/products/create')}
							startIcon={<Add />}
							sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
						>
							Create
						</Button>
						<Button
							color='inherit'
							onClick={() => navigate('/products?tab=my')}
							startIcon={<Inventory />}
							sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
						>
							My Products
						</Button>
						{isAuthenticated && username && (
							<>
								<Chip label={username} size='small' sx={{ ml: 1, display: { xs: 'none', md: 'flex' } }} />
								<Button
									color='inherit'
									onClick={handleLogout}
									startIcon={<Logout />}
									sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
								>
									Logout
								</Button>
							</>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			{/* Main Content */}
			<Box
				component='main'
				sx={{
					flex: 1,
					mt: '64px', // Height of AppBar
					mb: '80px', // Height of footer
					px: { xs: 2, sm: 3, md: 4, lg: 6 },
					py: 4,
					overflow: 'auto',
				}}
			>
				<Outlet />
			</Box>

			{/* Footer */}
			<Box
				component='footer'
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					py: 2,
					px: { xs: 2, sm: 3, md: 4, lg: 6 },
					backgroundColor: 'background.paper',
					borderTop: 1,
					borderColor: 'divider',
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
			>
				<Typography variant='body2' color='text.secondary' align='center'>
					© 2025 Product Manager Chat. Built with React + TypeScript + Redux Toolkit
				</Typography>
			</Box>
		</Box>
	);
};
