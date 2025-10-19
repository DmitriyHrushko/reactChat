import { Snackbar, Alert, type AlertColor } from '@mui/material';

interface ToastNotificationProps {
	open: boolean;
	message: string;
	severity?: AlertColor;
	onClose: () => void;
	autoHideDuration?: number;
}

export const ToastNotification = ({
	open,
	message,
	severity = 'info',
	onClose,
	autoHideDuration = 6000,
}: ToastNotificationProps) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		>
			<Alert onClose={onClose} severity={severity} variant='filled' sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
};
