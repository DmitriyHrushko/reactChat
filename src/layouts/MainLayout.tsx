import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, Add, Inventory, FiberManualRecord, Logout } from '@mui/icons-material';
import { useSocket } from '../hooks';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout, selectIsAuthenticated, selectUsername } from '../features/auth/authSlice';

export const MainLayout = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isConnected } = useSocket();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const username = useAppSelector(selectUsername);

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', pt: '64px', pb: '56px' }}>
			{/* Header */}
			<AppBar
				position='fixed'
				sx={{
					top: 0,
					left: 0,
					right: 0,
					zIndex: (theme) => theme.zIndex.appBar,
				}}
			>
				<Toolbar sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
					<Box
						onClick={() => navigate('/')}
						role='button'
						aria-label='Go to home'
						title='Go to home'
						tabIndex={0}
						onKeyDown={(e: React.KeyboardEvent) => {
							if (e.key === 'Enter' || e.key === ' ') navigate('/');
						}}
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexGrow: 1,
							cursor: 'pointer',
							'&:hover': { opacity: 0.9 },
						}}
					>
						<ShoppingCart sx={{ mr: 2 }} />
						<Typography
							variant='h6'
							component='div'
							sx={{
								fontWeight: 600,
								fontSize: { xs: '1rem', sm: '1.25rem' },
							}}
						>
							Product Manager
						</Typography>
					</Box>

					{/* Socket.IO Connection Indicator */}
					<Chip
						icon={<FiberManualRecord sx={{ fontSize: 12 }} />}
						label='Chat'
						size='small'
						color={isConnected ? 'success' : 'default'}
						sx={{
							mr: 2,
							'& .MuiChip-icon': {
								color: isConnected ? 'success.main' : 'grey.500',
							},
							display: { xs: 'none', sm: 'flex' },
						}}
					/>

					{/* (removed centered username) */}

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
							onClick={() => navigate('/products/createProduct')}
							startIcon={<Add />}
							sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
						>
							Create Product
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
					overflow: 'auto',
					py: 4,
				}}
			>
				<Box
					sx={{
						px: { xs: 2, sm: 3, md: 4, lg: 6 },
						maxWidth: '1400px',
						width: '100%',
						mx: 'auto',
					}}
				>
					<Outlet />
				</Box>
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
					zIndex: (theme) => theme.zIndex.appBar,
				}}
			>
				<Typography variant='body2' color='text.secondary' align='center'>
					© 2025 Product Manager Chat. Built with React + TypeScript + Redux Toolkit
				</Typography>
			</Box>
		</Box>
	);
};
