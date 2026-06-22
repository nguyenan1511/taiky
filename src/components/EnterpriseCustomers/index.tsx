import Container from '../Container';
import ListState from '../ListState';
import Skeleton from '../Skeleton';
import RevealStagger from '../RevealStagger';
import { usePartners } from '../../lib/api/queries';
import { img, t } from '../../lib/api/helpers';

/**
 * "KHÁCH HÀNG DOANH NGHIỆP (OEM/ODM)" — enterprise partners: intro copy + a
 * single centered row of brand logos from `GET /partners` (natural size).
 */

export default function EnterpriseCustomers() {
    const { data, isLoading, isError, refetch } = usePartners();
    const logos = data?.data ?? [];

    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <Container className="flex flex-col items-center gap-[16px] lg:gap-[20px] py-[40px]">
                <h2 className="font-stamp font-normal tracking-brand text-[26px] leading-[32px] lg:text-[48px] lg:leading-[44px] text-taiky-orange uppercase text-center">
                    KHÁCH HÀNG DOANH NGHIỆP (OEM/ODM)
                </h2>
                <p className="text-center text-[15px] leading-[22px] lg:text-[18px] lg:leading-[26px] font-bold tracking-[0.04em] text-taiky-lightbrown uppercase">
                    Đồng hành sản xuất &amp; phát triển sản phẩm cùng các thương hiệu
                </p>

                {isLoading ? (
                    <div className="mt-[24px] flex flex-wrap items-center justify-center gap-x-[28px] lg:gap-x-[40px] gap-y-[24px] lg:gap-y-[32px]">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-[60px] w-[120px] lg:h-[80px] lg:w-[160px] rounded-[8px]"
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <ListState
                            error={isError}
                            empty={logos.length === 0}
                            onRetry={() => refetch()}
                        />
                        {logos.length > 0 && (
                            <RevealStagger
                                step={60}
                                className="mt-[24px] flex flex-wrap items-center justify-center gap-x-[28px] lg:gap-x-[40px] gap-y-[24px] lg:gap-y-[32px]"
                            >
                                {logos.map((logo) => (
                                    <div className="w-[165px] aspect-[165/117]" key={logo.id}>
                                        <img
                                            src={img(logo.image)}
                                            alt={t(logo.name)}
                                            loading="lazy"
                                            className="w-full object-contain lg:h-auto lg:w-auto"
                                        />
                                    </div>
                                ))}
                            </RevealStagger>
                        )}
                    </>
                )}
            </Container>
        </section>
    );
}
