import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  delay?: number;
}

/**
 * Search bar with debounced input
 */
export const SearchBar = ({ onSearch, placeholder = 'Search products...', delay = 500 }: SearchBarProps) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <TextField
      fullWidth
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};
