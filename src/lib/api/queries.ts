import { useMutation, useQuery } from '@tanstack/react-query';
import { api, type QueryParams } from './client';
import type {
    ApiCulinary,
    ApiGrownUp,
    ApiLogo,
    ApiNews,
    ApiPage,
    ApiProduct,
    ApiSettings,
    ContactPayload,
    ItemResponse,
    ListResponse,
    Taxonomy,
} from './types';

/** Centralized query keys so caches stay consistent across the app. */
export const qk = {
    products: (params?: QueryParams) => ['products', params] as const,
    brands: ['brands'] as const,
    categories: ['categories'] as const,
    news: (params?: QueryParams) => ['news', params] as const,
    newsCategories: ['news-categories'] as const,
    partners: ['partners'] as const,
    markets: ['markets'] as const,
    settings: ['settings'] as const,
    grownUps: ['grown-ups'] as const,
    culinary: (params?: QueryParams) => ['culinary', params] as const,
    culinaryCategories: ['culinary-categories'] as const,
    page: (code: string) => ['page', code] as const,
};

// --- Products -------------------------------------------------------------

export interface ProductFilters {
    page?: number;
    limit?: number;
    categories?: string;
    brands?: string;
    lines?: string;
    volumes?: string;
    flavors?: string;
    isHighlight?: boolean;
}

export function useProducts(filters: ProductFilters = {}) {
    const params: QueryParams = { limit: 20, page: 1, ...filters };
    return useQuery({
        queryKey: qk.products(params),
        queryFn: () => api.get<ListResponse<ApiProduct>>('/api/v1/frontend/products', params),
    });
}

export function useFeaturedProducts(limit = 4) {
    return useProducts({ isHighlight: true, limit });
}

export function useBrands() {
    return useQuery({
        queryKey: qk.brands,
        queryFn: () =>
            api.get<ListResponse<Taxonomy>>('/api/v1/frontend/brands', { limit: 100, page: 1 }),
    });
}

// --- News -----------------------------------------------------------------

export interface NewsFilters {
    page?: number;
    limit?: number;
    categories?: string;
}

export function useNews(filters: NewsFilters = {}) {
    const params: QueryParams = { limit: 9, page: 1, ...filters };
    return useQuery({
        queryKey: qk.news(params),
        queryFn: () => api.get<ListResponse<ApiNews>>('/api/v1/frontend/news', params),
    });
}

export function useNewsCategories() {
    return useQuery({
        queryKey: qk.newsCategories,
        queryFn: () =>
            api.get<ListResponse<Taxonomy>>('/api/v1/frontend/news-categories', {
                limit: 100,
                page: 1,
            }),
    });
}

// --- Distribution (logos) -------------------------------------------------

export function usePartners() {
    return useQuery({
        queryKey: qk.partners,
        queryFn: () =>
            api.get<ListResponse<ApiLogo>>('/api/v1/frontend/partners', { limit: 100, page: 1 }),
    });
}

export function useMarkets() {
    return useQuery({
        queryKey: qk.markets,
        queryFn: () =>
            api.get<ListResponse<ApiLogo>>('/api/v1/frontend/markets', { limit: 100, page: 1 }),
    });
}

// --- Settings -------------------------------------------------------------

export function useSettings() {
    return useQuery({
        queryKey: qk.settings,
        queryFn: () => api.get<ItemResponse<ApiSettings>>('/api/v1/frontend/settings'),
    });
}

// --- Development timeline (grown-ups) -------------------------------------

export function useGrownUps() {
    return useQuery({
        queryKey: qk.grownUps,
        queryFn: () =>
            api.get<ListResponse<ApiGrownUp>>('/api/v1/frontend/grown-ups', {
                limit: 20,
                page: 1,
            }),
    });
}

// --- Culinary (recipes) ---------------------------------------------------
// NOTE: /culinary and /culinary-categories are in the Postman collection but
// not yet deployed (404). Hooks are ready; consumers should handle empty/error.

export interface CulinaryFilters {
    page?: number;
    limit?: number;
    categories?: string;
}

export function useCulinary(filters: CulinaryFilters = {}) {
    const params: QueryParams = { limit: 20, page: 1, ...filters };
    return useQuery({
        queryKey: qk.culinary(params),
        queryFn: () => api.get<ListResponse<ApiCulinary>>('/api/v1/frontend/culinary', params),
    });
}

export function useCulinaryCategories() {
    return useQuery({
        queryKey: qk.culinaryCategories,
        queryFn: () =>
            api.get<ListResponse<Taxonomy>>('/api/v1/frontend/culinary-categories', {
                limit: 100,
                page: 1,
            }),
    });
}

// --- Page CMS content -----------------------------------------------------

export function usePage(code: string) {
    return useQuery({
        queryKey: qk.page(code),
        queryFn: () => api.get<ItemResponse<ApiPage>>(`/api/v1/frontend/pages/${code}`),
    });
}

// --- Contact form ---------------------------------------------------------

export function useSubmitContact() {
    return useMutation({
        mutationFn: (payload: ContactPayload) =>
            api.post<{ success: boolean; message: string }>('/api/v1/frontend/contacts', payload),
    });
}

export function useSubmitSubscriber() {
    return useMutation({
        mutationFn: (email: string) =>
            api.post<{ success: boolean; message: string }>('/api/v1/frontend/subscribers', {
                email,
            }),
    });
}
