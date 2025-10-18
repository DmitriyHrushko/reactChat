import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, TextField, Container } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/auth/authSlice';
import { loginSchema, type LoginFormData } from '../utils/validation';

import { FlexCenter, FlexColumn, ElevatedCard, GradientText, GradientButton } from '../components/styled';

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
		<Container maxWidth='sm'>
			<FlexCenter sx={{ minHeight: '100vh' }}>
				<ElevatedCard sx={{ p: 4, width: '100%' }}>
					<FlexColumn sx={{ textAlign: 'center', mb: 4, gap: 1 }}>
						<GradientText variant='h4' component='h1'>
							Sign In
						</GradientText>
						<Typography variant='body1' color='text.secondary'>
							Please enter your username to continue
						</Typography>
						<Typography variant='caption' color='text.secondary'>
							Username: 3-20 latin letters, no spaces
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
			</FlexCenter>
		</Container>
	);
};
