import React from 'react';
import { Box } from '@mui/material';

interface HighlightedTextProps {
	text: string;
	searchQuery: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, searchQuery }) => {
	// If no search query or too short (less than 1 characters), return text as is
	if (!searchQuery.trim() || searchQuery.trim().length < 1) {
		return <>{text}</>;
	}

	// Create regex to find matches (case-insensitive)
	const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const regex = new RegExp(`(${escapedQuery})`, 'gi');
	const parts = text.split(regex);

	return (
		<>
			{parts.map((part, index) => {
				// Check if this part matches the search query (case-insensitive)
				const isMatch = part.toLowerCase() === searchQuery.toLowerCase();

				return isMatch ? (
					<Box
						key={index}
						component='span'
						sx={{
							backgroundColor: 'warning.light',
							color: 'warning.dark',
							fontWeight: 600,
							px: 0.5,
							borderRadius: 0.5,
						}}
					>
						{part}
					</Box>
				) : (
					<span key={index}>{part}</span>
				);
			})}
		</>
	);
};
