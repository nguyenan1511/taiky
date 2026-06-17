import Skeleton from '../Skeleton';

/**
 * Loading placeholder mirroring NewsItem's layout (image, tag, two-line title,
 * date). Shown in the news grid while `/news` is pending.
 */
export default function NewsCardSkeleton() {
    return (
        <div className="flex flex-col">
            <Skeleton className="aspect-[414/300] w-full rounded-[8px]" />
            <Skeleton className="mt-[16px] h-[13px] w-[40%] rounded-[4px]" />
            <Skeleton className="mt-[8px] h-[20px] w-full rounded-[4px]" />
            <Skeleton className="mt-[6px] h-[20px] w-[70%] rounded-[4px]" />
            <Skeleton className="mt-[10px] h-[13px] w-[30%] rounded-[4px]" />
        </div>
    );
}
