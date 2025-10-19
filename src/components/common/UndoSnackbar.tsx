import { Snackbar, Alert, Button, Box } from '@mui/material';
import { Undo } from '@mui/icons-material';

interface UndoSnackbarProps {
	open: boolean;
	message: string;
	onUndo: () => void;
	onClose: () => void;
	autoHideDuration?: number;
}

export const UndoSnackbar = ({ open, message, onUndo, onClose, autoHideDuration = 5000 }: UndoSnackbarProps) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		>
			<Alert
				onClose={onClose}
				severity='warning'
				variant='filled'
				sx={{ width: '100%' }}
				action={
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Button
							color='inherit'
							size='small'
							startIcon={<Undo />}
							onClick={(e) => {
								e.stopPropagation();
								onUndo();
							}}
							sx={{
								fontWeight: 'bold',
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 0.2)',
								},
							}}
						>
							UNDO
						</Button>
					</Box>
				}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};
