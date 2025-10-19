import { FormControl, InputLabel, Select, MenuItem, Box, IconButton } from '@mui/material';
import { SwapVert } from '@mui/icons-material';
import type { ProductFilters } from '../../types';
import { SORT_OPTIONS } from '../../constants';

interface SortSelectProps {
  sortBy: ProductFilters['sortBy'];
  sortOrder: ProductFilters['sortOrder'];
  onSortByChange: (sortBy: ProductFilters['sortBy']) => void;
  onSortOrderChange: (sortOrder: ProductFilters['sortOrder']) => void;
}

/**
 * Sort select with order toggle
 */
export const SortSelect = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SortSelectProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy || 'createdAt'}
          label="Sort By"
          onChange={(e) => onSortByChange(e.target.value as ProductFilters['sortBy'])}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        size="small"
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      >
        <SwapVert sx={{ transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none' }} />
      </IconButton>
    </Box>
  );
};
