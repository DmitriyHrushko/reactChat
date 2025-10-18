import { styled } from '@mui/material/styles';
import { Card, type CardProps } from '@mui/material';

export const ElevatedCard = styled(Card)<CardProps>(({ theme }) => ({
	borderRadius: typeof theme.shape.borderRadius === 'number' ? `${theme.shape.borderRadius * 2}px` : '1rem',
	boxShadow: theme.shadows[2],
	transition: 'all 0.3s ease-in-out',
	overflow: 'hidden',

	'&:hover': {
		boxShadow: theme.shadows[8],
		transform: 'translateY(-0.25rem)',
	},
}));
