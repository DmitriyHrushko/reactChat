import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, TextField, Container, Box } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/auth/authSlice';
import { loginSchema, type LoginFormData } from '../utils/validation';
import { FlexColumn, ElevatedCard, GradientText, GradientButton } from '../components/styled';

export const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			username: '',
		},
	});

	const onSubmit = (data: LoginFormData) => {
		dispatch(login(data.username));
		navigate('/products');
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: 'calc(100vh - 64px - 56px)',
				px: 2,
			}}
		>
			<Container maxWidth='sm'>
				<ElevatedCard sx={{ p: 4, width: '100%' }}>
					<FlexColumn sx={{ textAlign: 'center', mb: 3, gap: 1 }}>
						<Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
							<LoginIcon sx={{ fontSize: '4rem', color: 'primary.main' }} />
						</Box>
						<GradientText variant='h4' component='h1'>
							Welcome
						</GradientText>
						<Typography variant='body2' color='text.secondary'>
							Please enter your username to continue
						</Typography>
						<Typography variant='caption' color='text.secondary' sx={{ fontSize: '0.7rem' }}>
							3-20 latin letters, no spaces
						</Typography>
					</FlexColumn>

					<form onSubmit={handleSubmit(onSubmit)}>
						<FlexColumn>
							<Controller
								name='username'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label='Username'
										error={!!errors.username}
										helperText={errors.username?.message}
										autoFocus
										placeholder='johndoe'
									/>
								)}
							/>

							<GradientButton
								type='submit'
								fullWidth
								size='large'
								disabled={isSubmitting}
								startIcon={<LoginIcon />}
							>
								{isSubmitting ? 'Logging in...' : 'Login'}
							</GradientButton>
						</FlexColumn>
					</form>
				</ElevatedCard>
			</Container>
		</Box>
	);
};
