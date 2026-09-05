/**
 * Shared inline status row for data-driven sections: shows a centered
 * loading / error / empty message in the brand palette. Render it in place of
 * the grid while a query is pending, has errored, or returned nothing.
 */

import { useUi } from '../../content/ui';

type ListStateProps = {
    loading?: boolean;
    error?: boolean;
    empty?: boolean;
    onRetry?: () => void;
    loadingText?: string;
    errorText?: string;
    emptyText?: string;
};

export default function ListState({
    loading,
    error,
    empty,
    onRetry,
    loadingText,
    errorText,
    emptyText,
}: ListStateProps) {
    const ui = useUi().listState;
    if (!loading && !error && !empty) return null;

    const loadingMsg = loadingText ?? ui.loading;
    const errorMsg = errorText ?? ui.error;
    const emptyMsg = emptyText ?? ui.empty;

    return (
        <div className="flex w-full flex-col items-center justify-center gap-[12px] py-[60px] text-center">
            {loading && <p className="text-[16px] text-taiky-lightbrown">{loadingMsg}</p>}
            {error && (
                <>
                    <p className="text-[16px] text-taiky-brown">{errorMsg}</p>
                    {onRetry && (
                        <button
                            type="button"
                            onClick={onRetry}
                            className="btn-cta bg-taiky-yellow px-[28px] py-[10px] text-[14px] font-bold uppercase tracking-[0.04em] text-taiky-brown"
                        >
                            {ui.retry}
                        </button>
                    )}
                </>
            )}
            {empty && !loading && !error && (
                <p className="text-[16px] text-taiky-lightbrown">{emptyMsg}</p>
            )}
        </div>
    );
}
