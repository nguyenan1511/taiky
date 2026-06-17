/**
 * Thin fetch wrapper around the TAKYfood backend.
 *
 * - Base URL comes from `VITE_API_BASE_URL` (see `.env.example`).
 * - JSON in / JSON out; non-2xx responses throw an `ApiError`.
 * - Query params are appended from a plain object (undefined values are skipped).
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public body?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

interface RequestOptions extends Omit<RequestInit, 'body'> {
    params?: QueryParams;
    body?: unknown;
}

function buildUrl(path: string, params?: QueryParams): string {
    const url = new URL(`${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`);
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
        }
    }
    return url.toString();
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, body, headers, ...rest } = options;

    const response = await fetch(buildUrl(path, params), {
        ...rest,
        headers: {
            Accept: 'application/json',
            ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    // 204 No Content (or empty body) → return undefined as T.
    const text = await response.text();
    const data = text ? (JSON.parse(text) as unknown) : undefined;

    if (!response.ok) {
        const message =
            (data as { message?: string })?.message ??
            `Request failed: ${response.status} ${response.statusText}`;
        throw new ApiError(response.status, message, data);
    }

    return data as T;
}

export const api = {
    get: <T>(path: string, params?: QueryParams) => request<T>(path, { method: 'GET', params }),
    post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
    put: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body }),
    patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
