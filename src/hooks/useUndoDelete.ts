import { useState, useCallback } from 'react';
import type { Product } from '../types';

interface UndoState {
	product: Product | null;
	timeoutId: number | null;
}

interface UseUndoDelete {
	deletedProduct: Product | null;
	canUndo: boolean;
	handleDelete: (product: Product, onConfirm: () => void, undoDuration?: number) => void;
	handleUndo: (onRestore: (product: Product) => void) => void;
	clearUndo: () => void;
}

export const useUndoDelete = (): UseUndoDelete => {
	const [undoState, setUndoState] = useState<UndoState>({
		product: null,
		timeoutId: null,
	});

	const clearUndo = useCallback(() => {
		if (undoState.timeoutId) {
			clearTimeout(undoState.timeoutId);
		}
		setUndoState({ product: null, timeoutId: null });
	}, [undoState.timeoutId]);

	const handleDelete = useCallback(
		(product: Product, onConfirm: () => void, undoDuration: number = 5000) => {
			// Clear any existing undo timeout
			if (undoState.timeoutId) {
				clearTimeout(undoState.timeoutId);
			}

			// Execute delete immediately (optimistic)
			onConfirm();

			// Set up undo timeout
			const timeoutId = setTimeout(() => {
				setUndoState({ product: null, timeoutId: null });
			}, undoDuration) as unknown as number;

			setUndoState({ product, timeoutId });
		},
		[undoState.timeoutId]
	);

	const handleUndo = useCallback(
		(onRestore: (product: Product) => void) => {
			if (undoState.product) {
				// Clear the timeout
				if (undoState.timeoutId) {
					clearTimeout(undoState.timeoutId);
				}

				// Restore the product
				onRestore(undoState.product);

				// Clear undo state
				setUndoState({ product: null, timeoutId: null });
			}
		},
		[undoState]
	);

	return {
		deletedProduct: undoState.product,
		canUndo: undoState.product !== null,
		handleDelete,
		handleUndo,
		clearUndo,
	};
};
