import { FormControl, InputLabel, Select, MenuItem, Box, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { SwapVert } from '@mui/icons-material';
import type { ProductFilters } from '../../types';
import { SORT_OPTIONS } from '../../constants';

interface SortSelectProps {
	sortBy: ProductFilters['sortBy'];
	sortOrder: ProductFilters['sortOrder'];
	onSortByChange: (sortBy: ProductFilters['sortBy']) => void;
	onSortOrderChange: (sortOrder: ProductFilters['sortOrder']) => void;
	hideCreated?: boolean;
}

export const SortSelect = ({ sortBy, sortOrder, onSortByChange, onSortOrderChange, hideCreated = false }: SortSelectProps) => {
	const options = hideCreated ? SORT_OPTIONS.filter((o) => o.value !== 'createdAt') : SORT_OPTIONS;

	useEffect(() => {
		const hasCurrent = options.some((o) => o.value === sortBy);
		if (!hasCurrent && options.length > 0) {
			onSortByChange(options[0].value as ProductFilters['sortBy']);
		}
	}, [hideCreated, sortBy, onSortByChange, options]);
	return (
		<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
			<FormControl size='small' sx={{ minWidth: 150 }}>
				<InputLabel>Sort By</InputLabel>
				<Select
					value={sortBy || 'createdAt'}
					label='Sort By'
					onChange={(e) => onSortByChange(e.target.value as ProductFilters['sortBy'])}
				>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<IconButton
				size='small'
				onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
				title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
			>
				<SwapVert sx={{ transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none' }} />
			</IconButton>
		</Box>
	);
};
