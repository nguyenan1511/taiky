import { useRef, useState } from 'react';
import Container from '../Container';
import RecipeMeta from '../RecipeMeta';
import ListState from '../ListState';
import Skeleton from '../Skeleton';
import { useCulinary, usePage } from '../../lib/api/queries';
import { img, t } from '../../lib/api/helpers';
import { PAGE, pageSection } from '../../lib/api/pages';

/**
 * "HÔM NAY ĂN GÌ" — featured-recipe slider from `/culinary`. Each slide is a
 * split card: a lined-paper info panel (title + meta + summary + CTA) beside
 * the dish photo.
 */

const imgBg = '/images/bg-eat.jpg';
const imgDecorTopleft = '/images/decor-foodbowls.webp';
const imgDecorTopRight = '/images/decor-core-value.webp';

export default function TodayEat() {
    const [index, setIndex] = useState(0);

    const { data, isLoading, isError, refetch } = useCulinary({ limit: 10 });
    const recipes = (data?.data ?? []).map((c) => ({
        title: t(c.name),
        people: c.servings != null ? `${c.servings} Người` : '',
        time: c.cookingTime || '',
        difficulty: c.difficulty || '',
        description: t(c.description),
        image: img(c.image),
    }));
    const count = recipes.length;
    const recipe = count ? recipes[index % count] : undefined;
    const go = (delta: number) => {
        if (!count) return;
        setIndex((i) => (i + delta + count) % count);
    };

    // Mobile swipe: swipe left → next, swipe right → prev.
    const touchStartX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchStartX.current = null;
    };

    // FOOD page CMS section 2: heading + subtitle.
    const { data: page } = usePage(PAGE.FOOD);
    const s2 = pageSection(page?.data, '2');
    const heading = s2?.title || 'HÔM NAY ĂN GÌ';

    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <div className="absolute top-0 left-0 translate-x-[-30%] hidden lg:block">
                <img src={imgDecorTopleft} alt="bg-banner" />
            </div>
            <div className="absolute top-[60px] right-0 mix-blend-color-burn hidden lg:block">
                <img src={imgDecorTopRight} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[20px] lg:gap-[24px] py-[40px] lg:py-[60px] relative z-10">
                {/* Heading */}
                <h2 className="font-stamp font-normal tracking-brand text-[28px] leading-[32px] lg:text-[44px] lg:leading-[48px] text-taiky-orange uppercase text-center">
                    {heading}
                </h2>
                {s2?.content ? (
                    <div
                        className="text-center text-[15px] leading-[22px] lg:text-[20px] lg:leading-[28px] tracking-[0.04em] text-taiky-lightbrown uppercase font-bold [&_b]:font-bold [&_b]:text-taiky-brown"
                        dangerouslySetInnerHTML={{ __html: s2.content }}
                    />
                ) : (
                    <p className="text-center text-[15px] leading-[22px] lg:text-[20px] lg:leading-[28px] tracking-[0.04em] text-taiky-lightbrown uppercase font-bold">
                        <span className="font-bold text-taiky-brown">Bữa ăn gia đình</span> thêm
                        trọn vị khi có <span className="font-bold text-taiky-brown">TAKYFOOD</span>
                    </p>
                )}

                {/* Slider — arrows on desktop; swipe left/right on mobile */}
                <div className="relative w-full px-0 lg:px-[60px] pt-[20px]">
                    {isLoading ? (
                        <div className="flex flex-col lg:grid lg:h-[450px] lg:grid-cols-2 overflow-hidden rounded-md">
                            <Skeleton className="order-2 lg:order-none h-[220px] lg:h-full w-full" />
                            <Skeleton className="order-1 lg:order-none h-[220px] lg:h-full w-full" />
                        </div>
                    ) : !recipe ? (
                        <ListState
                            error={isError}
                            empty={!isError}
                            onRetry={() => refetch()}
                            emptyText="Chưa có công thức."
                        />
                    ) : (
                        <>
                            {/* Prev */}
                            <button
                                type="button"
                                onClick={() => go(-1)}
                                aria-label="Công thức trước"
                                className="absolute left-0 top-1/2 hidden h-[40px] w-[40px] lg:h-[48px] lg:w-[48px] -translate-y-1/2 items-center justify-center text-taiky-yellow transition hover:opacity-80 lg:flex"
                            >
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    className="h-[24px] w-[24px] lg:h-[34px] lg:w-[34px]"
                                >
                                    <path d="M19 12H5M11 6l-6 6 6 6" />
                                </svg>
                            </button>

                            {/* Slide — stacks on mobile; fixed height on desktop. Keyed by
                                index so the banner-style animations replay on each change:
                                the photo zooms in and the panel text staggers up. The viewport
                                clips the image zoom so nothing overflows. */}
                            <div
                                className="overflow-hidden rounded-md lg:[touch-action:auto] [touch-action:pan-y]"
                                onTouchStart={onTouchStart}
                                onTouchEnd={onTouchEnd}
                            >
                                <div
                                    key={index}
                                    className="flex flex-col lg:grid lg:h-[450px] lg:grid-cols-2"
                                >
                                    {/* Lined-paper info panel */}
                                    <div className="relative order-2 lg:order-none">
                                        <img
                                            src={imgBg}
                                            alt=""
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        <div className="relative z-10 flex h-full flex-col justify-center px-[24px] py-[28px] lg:px-[48px] lg:py-[56px]">
                                            <h3
                                                style={{ animationDelay: '0.1s' }}
                                                className="animate-hero-rise text-[20px] leading-[26px] lg:text-[28px] lg:leading-[34px] font-bold text-taiky-brown"
                                            >
                                                {recipe.title}
                                            </h3>
                                            <div
                                                style={{ animationDelay: '0.2s' }}
                                                className="animate-hero-rise"
                                            >
                                                <RecipeMeta
                                                    people={recipe.people}
                                                    time={recipe.time}
                                                    difficulty={recipe.difficulty}
                                                    className="mt-[16px] lg:mt-[20px] gap-x-[20px] lg:gap-x-[28px] text-[13px] lg:text-[15px]"
                                                />
                                            </div>
                                            <p
                                                style={{ animationDelay: '0.3s' }}
                                                className="animate-hero-rise mt-[16px] lg:mt-[24px] max-w-[460px] text-[14px] leading-[22px] lg:text-[16px] lg:leading-[26px] text-taiky-brown"
                                            >
                                                {recipe.description}
                                            </p>
                                            <button
                                                type="button"
                                                style={{ animationDelay: '0.4s' }}
                                                className="animate-hero-rise mt-[20px] lg:mt-[32px] w-fit btn-cta bg-taiky-yellow px-[28px] py-[12px] lg:px-[36px] lg:py-[14px]"
                                            >
                                                <span className="text-[14px] lg:text-[15px] font-bold uppercase tracking-[0.06em] text-taiky-brown">
                                                    Xem chi tiết
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Dish photo — zooms in like a banner */}
                                    <div className="relative order-1 lg:order-none overflow-hidden">
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="animate-hero-zoom h-[220px] w-full object-cover lg:h-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Next */}
                            <button
                                type="button"
                                onClick={() => go(1)}
                                aria-label="Công thức sau"
                                className="absolute right-0 top-1/2 hidden h-[40px] w-[40px] lg:h-[48px] lg:w-[48px] -translate-y-1/2 items-center justify-center text-taiky-yellow transition hover:opacity-80 lg:flex"
                            >
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 24 24"
                                    className="h-[24px] w-[24px] lg:h-[34px] lg:w-[34px]"
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
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
}
