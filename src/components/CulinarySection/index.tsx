import { useState } from 'react';
import Container from '../Container';
import RecipeItem from '../RecipeItem';
import RecipeCardSkeleton from '../RecipeItem/Skeleton';
import ListState from '../ListState';
import RevealStagger from '../RevealStagger';
import { useCulinary } from '../../lib/api/queries';
import { t, toRecipeCard } from '../../lib/api/helpers';
import type { Taxonomy } from '../../lib/api/types';
import { useUi } from '../../content/ui';

/**
 * One recipe section driven by a culinary category: the category name is the
 * heading, and the grid shows recipes from `GET /culinary?categories=<id>`.
 * Rendered once per category by the Food page. "View more" grows the requested
 * limit by one page; the control hides once every recipe is loaded.
 */

const PAGE_SIZE = 6;

function MoreButton({
    className = '',
    onClick,
    disabled,
    label,
}: {
    className?: string;
    onClick: () => void;
    disabled?: boolean;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-[8px] text-[13px] font-bold uppercase tracking-[0.06em] text-taiky-yellow transition hover:opacity-80 disabled:opacity-60 ${className}`}
        >
            {label}
            <svg
                width="20"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
        </button>
    );
}

export default function CulinarySection({ category }: { category: Taxonomy }) {
    const ui = useUi();
    const [limit, setLimit] = useState(PAGE_SIZE);
    const { data, isLoading, isFetching, isError, refetch } = useCulinary({
        categories: category.id,
        limit,
    });
    const recipes = (data?.data ?? []).map(toRecipeCard);
    const total = data?.pagination.total ?? 0;
    const hasMore = recipes.length < total;
    const moreLabel = isFetching ? ui.culinarySection.loadingMore : ui.common.viewMore;
    const loadMore = () => setLimit((n) => n + PAGE_SIZE);

    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <Container className="flex flex-col gap-[24px] lg:gap-[38px] py-[40px]">
                <div className="relative flex items-center justify-center">
                    <h2 className="font-stamp font-normal tracking-brand text-[26px] leading-[32px] lg:text-[48px] lg:leading-[44px] text-taiky-orange uppercase text-center">
                        {t(category.name)}
                    </h2>
                    {hasMore && (
                        <MoreButton
                            className="hidden lg:flex absolute right-0"
                            onClick={loadMore}
                            disabled={isFetching}
                            label={moreLabel}
                        />
                    )}
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <RecipeCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        <ListState
                            error={isError}
                            empty={recipes.length === 0}
                            onRetry={() => refetch()}
                            emptyText={ui.culinarySection.empty}
                        />
                        {recipes.length > 0 && (
                            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                                {recipes.map((recipe) => (
                                    <RecipeItem key={recipe.id} {...recipe} />
                                ))}
                            </RevealStagger>
                        )}
                    </>
                )}

                {hasMore && (
                    <MoreButton
                        className="lg:hidden self-center"
                        onClick={loadMore}
                        disabled={isFetching}
                        label={moreLabel}
                    />
                )}
            </Container>
        </section>
    );
}
