/**
 * Base loading placeholder: a warm cream block with a sheen sweeping across it
 * (same motion language as the card-hover sheen). Compose it with Tailwind
 * sizing/rounding classes to mirror whatever content is loading.
 *
 *   <Skeleton className="h-[300px] w-full rounded-[16px]" />
 */

type SkeletonProps = {
    className?: string;
};

export default function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div aria-hidden="true" className={`relative overflow-hidden bg-taiky-cream ${className}`}>
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/55 to-transparent" />
        </div>
    );
}
