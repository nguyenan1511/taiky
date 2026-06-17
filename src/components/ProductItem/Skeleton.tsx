import Skeleton from '../Skeleton';

/**
 * Loading placeholder mirroring ProductItem's layout (social row, image area,
 * name + weight). Shown in the product grids while `/products` is pending.
 */
export default function ProductCardSkeleton() {
    return (
        <div className="flex flex-col rounded-[16px] border border-taiky-lightbrown/30 bg-[#F3E9DC] p-[20px] shadow-card">
            <div className="flex items-center gap-[12px]">
                <Skeleton className="h-[40px] w-[40px] rounded-full" />
                <Skeleton className="h-[40px] w-[40px] rounded-full" />
            </div>
            <div className="flex flex-1 items-center justify-center py-[24px]">
                <Skeleton className="h-[300px] w-full rounded-[12px]" />
            </div>
            <Skeleton className="mx-auto h-[22px] w-[80%] rounded-[6px]" />
            <Skeleton className="mx-auto mt-[12px] h-[16px] w-[50%] rounded-[6px]" />
        </div>
    );
}
