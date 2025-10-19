import { useState, useCallback } from 'react';

interface UseConfirmDialog {
	isOpen: boolean;
	message: string;
	title: string;
	open: (title: string, message: string) => Promise<boolean>;
	close: () => void;
	confirm: () => void;
	cancel: () => void;
}

export const useConfirmDialog = (): UseConfirmDialog => {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [title, setTitle] = useState('');
	const [resolveCallback, setResolveCallback] = useState<((value: boolean) => void) | null>(null);

	const open = useCallback((dialogTitle: string, dialogMessage: string): Promise<boolean> => {
		setTitle(dialogTitle);
		setMessage(dialogMessage);
		setIsOpen(true);

		return new Promise<boolean>((resolve) => {
			setResolveCallback(() => resolve);
		});
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
		setTitle('');
		setMessage('');
		setResolveCallback(null);
	}, []);

	const confirm = useCallback(() => {
		if (resolveCallback) {
			resolveCallback(true);
		}
		close();
	}, [resolveCallback, close]);

	const cancel = useCallback(() => {
		if (resolveCallback) {
			resolveCallback(false);
		}
		close();
	}, [resolveCallback, close]);

	return {
		isOpen,
		message,
		title,
		open,
		close,
		confirm,
		cancel,
	};
};
