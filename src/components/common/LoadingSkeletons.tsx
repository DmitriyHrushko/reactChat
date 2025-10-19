import { Box, Skeleton, Card, CardContent } from '@mui/material';

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
				gap: 3,
			}}
		>
			{Array.from({ length: count }).map((_, index) => (
				<Card key={index}>
					<Skeleton variant='rectangular' height={200} />
					<CardContent>
						<Skeleton variant='text' width='80%' height={32} />
						<Skeleton variant='text' width='40%' height={24} />
						<Skeleton variant='text' width='60%' />
					</CardContent>
				</Card>
			))}
		</Box>
	);
};

export const ProductDetailSkeleton = () => {
	return (
		<>
			<Skeleton variant='rectangular' width='100%' height={400} sx={{ mb: 2 }} />
			<Skeleton variant='text' width='60%' height={48} />
			<Skeleton variant='text' width='30%' height={36} />
			<Skeleton variant='text' width='100%' />
			<Skeleton variant='text' width='100%' />
			<Skeleton variant='text' width='80%' />
		</>
	);
};
