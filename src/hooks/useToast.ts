import { useState, useCallback } from 'react';
import type { AlertColor } from '@mui/material';

interface Toast {
	open: boolean;
	message: string;
	severity: AlertColor;
}

interface UseToast {
	toast: Toast;
	showToast: (message: string, severity?: AlertColor) => void;
	showSuccess: (message: string) => void;
	showError: (message: string) => void;
	showWarning: (message: string) => void;
	showInfo: (message: string) => void;
	closeToast: () => void;
}

export const useToast = (): UseToast => {
	const [toast, setToast] = useState<Toast>({
		open: false,
		message: '',
		severity: 'info',
	});

	const showToast = useCallback((message: string, severity: AlertColor = 'info') => {
		setToast({
			open: true,
			message,
			severity,
		});
	}, []);

	const showSuccess = useCallback(
		(message: string) => {
			showToast(message, 'success');
		},
		[showToast]
	);

	const showError = useCallback(
		(message: string) => {
			showToast(message, 'error');
		},
		[showToast]
	);

	const showWarning = useCallback(
		(message: string) => {
			showToast(message, 'warning');
		},
		[showToast]
	);

	const showInfo = useCallback(
		(message: string) => {
			showToast(message, 'info');
		},
		[showToast]
	);

	const closeToast = useCallback(() => {
		setToast((prev) => ({ ...prev, open: false }));
	}, []);

	return {
		toast,
		showToast,
		showSuccess,
		showError,
		showWarning,
		showInfo,
		closeToast,
	};
};
