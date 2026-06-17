import { QueryClient } from '@tanstack/react-query';

/**
 * Shared TanStack Query client. Conservative defaults for a content site:
 * data is fresh for a minute, retried once, and not refetched on every focus.
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
