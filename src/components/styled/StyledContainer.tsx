import { styled } from '@mui/material/styles';
import { Box, type BoxProps } from '@mui/material';

export const FlexCenter = styled(Box)<BoxProps>({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const FlexRow = styled(Box)<BoxProps>(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	gap: theme.spacing(2),
	alignItems: 'center',
}));

export const FlexColumn = styled(Box)<BoxProps>(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
}));
