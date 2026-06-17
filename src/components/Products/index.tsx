import { useState, useRef, useLayoutEffect } from 'react';
import Container from '../Container';
import ProductCard from './ProductCard';
import ListState from '../ListState';
import { useBrands, useProducts, usePage } from '../../lib/api/queries';
import { img, t } from '../../lib/api/helpers';
import { PAGE, pageSection } from '../../lib/api/pages';

const imgArrow = '/images/prod-arrow.svg';
const imgDecor = '/images/decor-products.png';

const CARD_GAP = 16;
const LIMIT = 12;

/** Cards visible at once, by window width. */
function visibleFor(width: number) {
    if (width >= 1024) return 4;
    if (width >= 640) return 2;
    return 1;
}

export default function Products() {
    const [activeBrand, setActiveBrand] = useState(''); // '' = all brands
    const [ddOpen, setDdOpen] = useState(false);

    // HOME page CMS: section 2 = ticker line, section 3 = heading.
    const { data: homePage } = usePage(PAGE.HOME);
    const tickerHtml = pageSection(homePage?.data, '2')?.content;
    const heading = pageSection(homePage?.data, '3')?.title || 'SẢN PHẨM';

    // Brand tabs + products from the API (same source as the /products catalog).
    const { data: brandsData } = useBrands();
    const brandTabs = [
        { id: '', label: 'Tất cả' },
        ...(brandsData?.data ?? []).map((b) => ({ id: b.id, label: t(b.name) })),
    ];
    const activeLabel = brandTabs.find((b) => b.id === activeBrand)?.label ?? 'Tất cả';

    const { data, isLoading, isError, refetch } = useProducts({
        brands: activeBrand || undefined,
        limit: LIMIT,
    });
    const cards = (data?.data ?? []).map((p) => ({
        img: img(p.image),
        title: t(p.name),
        desc: t(p.description),
    }));

    const COPY = cards.length; // one full set; we render 3 sets for looping
    const looped = COPY ? [...cards, ...cards, ...cards] : [];

    // Responsive carousel metrics, measured from the viewport element.
    const viewportRef = useRef<HTMLDivElement>(null);
    const [cardW, setCardW] = useState(264);
    const step = cardW + CARD_GAP;

    const posRef = useRef(COPY);
    const busy = useRef(false);
    const [tx, setTx] = useState(-COPY * (264 + CARD_GAP));
    const [dur, setDur] = useState('0s');

    // Measure the viewport and derive card width from the visible count.
    useLayoutEffect(() => {
        const el = viewportRef.current;
        if (!el || COPY === 0) return;
        const measure = () => {
            const vis = visibleFor(window.innerWidth);
            const cw = Math.max(120, (el.clientWidth - (vis - 1) * CARD_GAP) / vis);
            setCardW(cw);
            posRef.current = COPY;
            setDur('0s');
            setTx(-COPY * (cw + CARD_GAP));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [COPY]);

    const slide = (dir: 1 | -1) => {
        if (busy.current || COPY === 0) return;
        busy.current = true;
        posRef.current += dir;
        setDur('0.45s');
        setTx(-posRef.current * step);
    };

    const onTransitionEnd = () => {
        const pos = posRef.current;
        if (pos >= COPY * 2) {
            posRef.current = pos - COPY;
            setDur('0s');
            setTx(-(pos - COPY) * step);
        } else if (pos < COPY) {
            posRef.current = pos + COPY;
            setDur('0s');
            setTx(-(pos + COPY) * step);
        }
        requestAnimationFrame(() => {
            busy.current = false;
        });
    };

    const selectBrand = (id: string) => {
        setActiveBrand(id);
        setDdOpen(false);
    };

    const tabActive = (id: string) => id === activeBrand;

    return (
        <section
            id="san-pham"
            className="relative w-full overflow-hidden pt-[48px] lg:pt-[60px] z-[2]"
        >
            <div className="absolute top-1/2 left-[-10%] translate-y-[-50%] hidden lg:block">
                <img src={imgDecor} alt="bg-banner" />
            </div>
            <Container className="relative z-10">
                {/* Ticker — centered, wraps on small screens (CMS section 2) */}
                {tickerHtml ? (
                    <div
                        className="pb-[40px] lg:pb-[68px] text-center font-bold text-[16px] leading-[22px] lg:text-[24px] lg:leading-[24px] text-taiky-lightbrown [&_b]:font-bold [&_b]:text-taiky-brown"
                        dangerouslySetInnerHTML={{ __html: tickerHtml }}
                    />
                ) : (
                    <p className="flex flex-wrap justify-center gap-x-[6px] gap-y-[2px] pb-[40px] lg:pb-[68px] text-center font-bold text-[16px] leading-[22px] lg:text-[24px] lg:leading-[24px] lg:flex-nowrap lg:whitespace-nowrap">
                        <span className="text-taiky-lightbrown">TÀI KÝ LÀ</span>
                        <span className="text-taiky-brown">{' CHÍNH MÌNH, '}</span>
                        <span className="text-taiky-lightbrown">SẢN PHẨM LÀ</span>
                        <span className="text-taiky-brown">{' HOÀN HẢO, '}</span>
                        <span className="text-taiky-lightbrown">{'KHÁCH HÀNG LÀ '}</span>
                        <span className="text-taiky-brown">THƯỢNG ĐẾ</span>
                    </p>
                )}

                {/* Heading + brand selector */}
                <div className="flex flex-col items-center gap-[28px] lg:gap-[40px] mb-[32px] lg:mb-[40px]">
                    <h2 className="font-stamp font-normal text-[32px] leading-[34px] lg:text-[48px] lg:leading-[48px] text-taiky-orange uppercase whitespace-nowrap">
                        {heading}
                    </h2>

                    {/* Mobile / tablet: dropdown */}
                    <div className="relative w-full max-w-[320px] lg:hidden">
                        <button
                            type="button"
                            onClick={() => setDdOpen((o) => !o)}
                            aria-expanded={ddOpen}
                            className="flex w-full items-center justify-between border-b border-taiky-lightbrown/40 pb-[10px] font-bold text-[18px] uppercase text-taiky-brown"
                        >
                            {activeLabel}
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                                className={`text-taiky-orange transition-transform ${ddOpen ? 'rotate-180' : ''}`}
                            >
                                <path
                                    d="M6 9l6 6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        {ddOpen && (
                            <ul className="absolute left-0 right-0 z-20 mt-[6px] max-h-[280px] overflow-auto rounded-[8px] bg-taiky-bg shadow-card-hover">
                                {brandTabs.map((tab) => (
                                    <li key={tab.id || 'all'}>
                                        <button
                                            type="button"
                                            onClick={() => selectBrand(tab.id)}
                                            className={`block w-full px-[16px] py-[10px] text-left text-[15px] font-bold uppercase transition-colors ${
                                                tabActive(tab.id)
                                                    ? 'text-taiky-orange'
                                                    : 'text-taiky-brown hover:text-taiky-orange'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Desktop: tab row */}
                    <div className="hidden lg:flex flex-wrap items-start justify-center gap-[40px] relative">
                        {brandTabs.map((tab) => (
                            <button
                                key={tab.id || 'all'}
                                onClick={() => selectBrand(tab.id)}
                                className={`relative shrink-0 pb-[6px] bg-transparent border-none cursor-pointer font-bold text-[20px] leading-6 whitespace-nowrap transition-colors duration-[250ms] ease-linear ${
                                    tabActive(tab.id) ? 'text-taiky-orange' : 'text-taiky-brown'
                                }`}
                            >
                                {tab.label}
                                <span
                                    className={`absolute bottom-0 left-0 w-full block h-[2px] bg-taiky-orange rounded-[1px] transition-transform duration-[250ms] ease-linear origin-center ${
                                        tabActive(tab.id) ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <ListState
                    loading={isLoading}
                    error={isError}
                    empty={!isLoading && cards.length === 0}
                    onRetry={() => refetch()}
                    emptyText="Chưa có sản phẩm cho thương hiệu này."
                />

                {/* Carousel */}
                {cards.length > 0 && (
                    <div className="relative flex items-start justify-between gap-[8px] lg:gap-0 px-0 lg:px-[80px]">
                        <button
                            onClick={() => slide(-1)}
                            aria-label="Sản phẩm trước"
                            className="shrink-0 self-start mt-[110px] lg:mt-[138px] hover:opacity-60 active:scale-90 transition"
                        >
                            <img
                                src={imgArrow}
                                alt="prev"
                                className="h-[22px] w-[32px] lg:h-[26px] lg:w-[40px] object-contain"
                            />
                        </button>

                        {/* Viewport — clips the sliding track; width is fluid */}
                        <div ref={viewportRef} className="overflow-hidden flex-1">
                            <div
                                className="flex items-start gap-4 will-change-transform"
                                style={{
                                    transform: `translateX(${tx}px)`,
                                    transition: `transform ${dur} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                                }}
                                onTransitionEnd={onTransitionEnd}
                            >
                                {looped.map((p, i) => (
                                    // Slide wrapper — width is the carousel's layout concern
                                    // (tied to STEP math), so it stays a dynamic value; the
                                    // card fills it (w-full).
                                    <div
                                        key={i}
                                        className="shrink-0"
                                        style={{ width: `${cardW}px` }}
                                    >
                                        <ProductCard {...p} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => slide(1)}
                            aria-label="Sản phẩm sau"
                            className="shrink-0 self-start mt-[110px] lg:mt-[138px] hover:opacity-60 active:scale-90 transition"
                        >
                            <img
                                src={imgArrow}
                                alt="next"
                                className="h-[22px] w-[32px] lg:h-[26px] lg:w-[40px] object-contain rotate-180"
                            />
                        </button>
                    </div>
                )}
            </Container>
        </section>
    );
}
