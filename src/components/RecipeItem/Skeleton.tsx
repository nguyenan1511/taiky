import Skeleton from '../Skeleton';

/**
 * Loading placeholder mirroring RecipeItem (photo above a title + meta panel).
 * Shown in the recipe grids while `/culinary` is pending.
 */
export default function RecipeCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-[8px] shadow-card">
            <Skeleton className="aspect-[416/300] w-full" />
            <div className="p-[20px]">
                <Skeleton className="h-[20px] w-[80%] rounded-[6px]" />
                <Skeleton className="mt-[14px] h-[14px] w-[60%] rounded-[6px]" />
            </div>
        </div>
    );
}
