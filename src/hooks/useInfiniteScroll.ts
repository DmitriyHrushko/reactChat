import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
	onLoadMore: () => void;
	hasMore: boolean;
	isLoading: boolean;
	rootMargin?: string;
	threshold?: number;
}

export const useInfiniteScroll = ({
	onLoadMore,
	hasMore,
	isLoading,
	rootMargin = '100px',
	threshold = 0.1,
}: UseInfiniteScrollOptions) => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [target] = entries;

			if (target.isIntersecting && hasMore && !isLoading) {
				onLoadMore();
			}
		},
		[hasMore, isLoading, onLoadMore]
	);

	useEffect(() => {
		const element = loadMoreRef.current;
		if (!element) return;

		// Create observer
		observerRef.current = new IntersectionObserver(handleObserver, {
			root: null, // viewport
			rootMargin,
			threshold,
		});

		// Start observing
		observerRef.current.observe(element);

		// Cleanup
		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [handleObserver, rootMargin, threshold]);

	return loadMoreRef;
};
