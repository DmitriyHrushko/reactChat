import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks';

interface SearchBarProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	delay?: number;
	value?: string;
}

export const SearchBar = ({
	onSearch,
	placeholder = 'Search products...',
	delay = 500,
	value: controlledValue,
}: SearchBarProps) => {
	const [value, setValue] = useState(controlledValue ?? '');
	const debouncedValue = useDebounce(value, delay);
	const onSearchRef = useRef(onSearch);

	useEffect(() => {
		onSearchRef.current = onSearch;
	}, [onSearch]);

	useEffect(() => {
		onSearchRef.current(debouncedValue);
	}, [debouncedValue]);

	useEffect(() => {
		if (controlledValue !== undefined && controlledValue !== value) {
			setValue(controlledValue);
		}
	}, [controlledValue]);

	return (
		<TextField
			fullWidth
			size='small'
			placeholder={placeholder}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<Search />
					</InputAdornment>
				),
			}}
		/>
	);
};
