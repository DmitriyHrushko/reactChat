import { styled } from '@mui/material/styles';
import { Button, type ButtonProps } from '@mui/material';

export const GradientButton = styled(Button)<ButtonProps>(({ theme }) => ({
	background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
	color: theme.palette.primary.contrastText,
	fontWeight: 600,
	padding: '0.625rem 1.5rem',
	borderRadius: theme.shape.borderRadius,
	textTransform: 'none',
	boxShadow: theme.shadows[2],
	transition: 'all 0.2s ease-in-out',

	'&:hover': {
		background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		boxShadow: theme.shadows[4],
		transform: 'translateY(-0.125rem)',
	},

	'&:active': {
		transform: 'translateY(0)',
		boxShadow: theme.shadows[2],
	},

	'&.Mui-disabled': {
		background: theme.palette.action.disabledBackground,
		color: theme.palette.action.disabled,
	},
}));
