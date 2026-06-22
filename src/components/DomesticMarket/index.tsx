import Container from '../Container';
import ListState from '../ListState';
import Skeleton from '../Skeleton';
import RevealStagger from '../RevealStagger';
import { useMarkets } from '../../lib/api/queries';
import { img, t } from '../../lib/api/helpers';

/**
 * "THỊ TRƯỜNG NỘI ĐỊA" — domestic distribution: intro copy + a centered grid
 * of retail-channel logos from `GET /markets` (6 per row; the final short row
 * auto-centers).
 */

const imgSketch = '/images/hero-sketch.webp';
const imgDecor = '/images/decor-products.webp';

export default function DomesticMarket() {
    const { data, isLoading, isError, refetch } = useMarkets();
    const logos = data?.data ?? [];
    const firstRows = logos.slice(0, 12);
    const lastRow = logos.slice(12);

    return (
        <section className="relative w-full overflow-visible bg-taiky-bg pt-[100px] lg:pt-[120px]">
            <div className="absolute top-[200px] right-0 mix-blend-color-burn opacity-20 hidden lg:block">
                <img src={imgSketch} alt="bg-banner" />
            </div>
            <div className="absolute bottom-[-200px] left-0 hidden lg:block">
                <img src={imgDecor} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[20px] lg:gap-[24px] py-[40px] relative z-10">
                <h2 className="font-stamp font-normal tracking-brand text-[26px] leading-[32px] lg:text-[48px] lg:leading-[44px] text-taiky-orange uppercase text-center">
                    THỊ TRƯỜNG NỘI ĐỊA
                </h2>
                <p className="text-center text-[15px] leading-[22px] lg:text-[18px] lg:leading-[26px] tracking-[0.04em] text-taiky-lightbrown uppercase">
                    Bột thực phẩm từ nguồn{' '}
                    <span className="font-bold text-taiky-brown">nông sản tự nhiên</span> vì sức
                    khỏe cộng đồng.
                </p>

                {isLoading && (
                    <div className="mt-[24px] grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 place-items-center gap-x-[20px] lg:gap-x-[40px] gap-y-[16px] lg:gap-y-[10px]">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-[100px] w-full max-w-[197px] lg:h-[140px] rounded-[8px]"
                            />
                        ))}
                    </div>
                )}

                {!isLoading && (
                    <ListState
                        error={isError}
                        empty={logos.length === 0}
                        onRetry={() => refetch()}
                    />
                )}

                {/* Rows 1-2: 6 logos each. Row 3: the remaining ones, centered. */}
                {firstRows.length > 0 && (
                    <RevealStagger
                        step={60}
                        className="mt-[24px] grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 place-items-center gap-x-[20px] lg:gap-x-[40px] gap-y-[16px] lg:gap-y-[10px]"
                    >
                        {firstRows.map((logo) => (
                            <div
                                className="bg-taiky-bg w-full max-w-[197px] h-[100px] lg:h-[140px] flex justify-center items-center"
                                key={logo.id}
                            >
                                <img
                                    src={img(logo.image)}
                                    alt={t(logo.name)}
                                    loading="lazy"
                                    className="max-h-full max-w-full object-contain transition-transform duration-[400ms] ease-brand hover:scale-[1.08]"
                                />
                            </div>
                        ))}
                    </RevealStagger>
                )}
                {lastRow.length > 0 && (
                    <div className="mt-[18px] flex flex-wrap items-center justify-center gap-x-[20px] lg:gap-x-[40px] gap-y-[16px]">
                        {lastRow.map((logo) => (
                            <div
                                className="bg-taiky-bg w-[140px] sm:w-[180px] lg:w-[197px] h-[100px] lg:h-[140px] flex justify-center items-center"
                                key={logo.id}
                            >
                                <img
                                    src={img(logo.image)}
                                    alt={t(logo.name)}
                                    loading="lazy"
                                    className="max-h-full max-w-full object-contain transition-transform duration-[400ms] ease-brand hover:scale-[1.08]"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
