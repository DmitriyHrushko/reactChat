import { styled } from '@mui/material/styles';
import { Typography, type TypographyProps } from '@mui/material';

export const GradientText = styled(Typography)<TypographyProps>(({ theme }) => ({
	background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	backgroundClip: 'text',
	fontWeight: 'bold',
}));
