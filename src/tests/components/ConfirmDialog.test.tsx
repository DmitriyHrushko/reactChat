import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';

describe('ConfirmDialog', () => {
	it('renders when open is true', () => {
		render(
			<ConfirmDialog
				open={true}
				title='Confirm Action'
				message='Are you sure?'
				onConfirm={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		expect(screen.getByText('Confirm Action')).toBeInTheDocument();
		expect(screen.getByText('Are you sure?')).toBeInTheDocument();
	});

	it('does not render when open is false', () => {
		render(
			<ConfirmDialog
				open={false}
				title='Confirm Action'
				message='Are you sure?'
				onConfirm={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
	});

	it('calls onConfirm when confirm button is clicked', async () => {
		const onConfirm = vi.fn();
		const user = userEvent.setup();

		render(
			<ConfirmDialog
				open={true}
				title='Confirm Action'
				message='Are you sure?'
				onConfirm={onConfirm}
				onCancel={vi.fn()}
			/>
		);

		const confirmButton = screen.getByText('Confirm');
		await user.click(confirmButton);

		expect(onConfirm).toHaveBeenCalledOnce();
	});

	it('calls onCancel when cancel button is clicked', async () => {
		const onCancel = vi.fn();
		const user = userEvent.setup();

		render(
			<ConfirmDialog
				open={true}
				title='Confirm Action'
				message='Are you sure?'
				onConfirm={vi.fn()}
				onCancel={onCancel}
			/>
		);

		const cancelButton = screen.getByText('Cancel');
		await user.click(cancelButton);

		expect(onCancel).toHaveBeenCalledOnce();
	});
});
