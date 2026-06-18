import Skeleton from '../Skeleton';

/**
 * Loading placeholder matching the carousel's ProductCard (image → title →
 * description → CTA). Shown while `/products` is fetching on the homepage.
 */
export default function ProductCardSkeleton() {
    return (
        <div className="flex w-full flex-col items-center gap-[16px]">
            <Skeleton className="h-[260px] sm:h-[301px] w-full rounded-[8px]" />
            <Skeleton className="h-[22px] w-[70%] rounded-[6px]" />
            <Skeleton className="h-[14px] w-[90%] rounded-[6px]" />
            <Skeleton className="h-[14px] w-[80%] rounded-[6px]" />
            <Skeleton className="mt-[2px] h-[20px] w-[40%] rounded-[6px]" />
        </div>
    );
}
