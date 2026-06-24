/**
 * "HÀNH TRÌNH 50 NĂM" — core-values section: the 50-year tree mark above the
 * "GIÁ TRỊ CỐT LÕI" composition — an orange dome (main-core) ringed by the
 * five TAIKY letter circles and the five value blocks.
 */

import Container from '../Container';
import BannerImage from '../BannerImage';
import { usePage } from '../../lib/api/queries';
import { PAGE, pageSection } from '../../lib/api/pages';

const imgDecorTopleft = '/images/decor-orange.webp';
const imgDecorBottomRight = '/images/decor-foodbowls-2.webp';
const imgMainCore = '/images/corevalue.webp';
const imgDecorCoreValue = '/images/decor-core-value.webp';
const imgDecorLeftMb = '/images/imgDecorLeftMb.webp';
const imgDecorRightMb = '/images/imgDecorRightMb.webp';

// Shown only on mobile — the desktop composite (corevalue.webp) bakes these in,
// but they're unreadable when scaled down, so we render them as text instead.
const CORE_VALUES = [
    {
        title: 'Tôn trọng',
        desc: 'Tôn trọng thương hiệu TAKYfood. Tôn trọng thành viên TAKYfood. Tôn trọng đối tác, khách hàng. Đó là Tôn trọng chính mình,',
    },
    { title: 'An tâm', desc: 'Sản phẩm đáng TIN cậy.' },
    { title: 'Ích lợi', desc: 'Mang lại LỢI ÍCH cho khách hàng và các bên liên quan.' },
    {
        title: 'Khát vọng',
        desc: 'KHÁT VỌNG biểu tượng BÁNH VIỆT ẩm thực văn hóa VIỆT NAM vươn ra thế giới.',
    },
    { title: 'Yên tâm', desc: 'Người CHÍNH TRỰC: trung thực trong lời nói và hành động.' },
];

export default function CoreValues() {
    // ABOUT-US page CMS section 3: the core-values composite image.
    const { data } = usePage(PAGE.ABOUT_US);
    const s3 = pageSection(data?.data, '3');
    const s2 = pageSection(data?.data, '2');
    const hasImage = Boolean(s3?.image || s3?.imageMb);
    const hasImageS2 = Boolean(s2?.image || s2?.imageMb);

    return (
        <>
            <section id="goc-am-thuc" className="relative w-full overflow-hidden bg-taiky-bg">
                <div className="absolute top-0 left-0 translate-x-[-25%] translate-y-[-50%] hidden lg:block">
                    <img src={imgDecorTopleft} alt="bg-banner" />
                </div>
                <div className="absolute top-0 right-0 translate-x-[60%] hidden lg:block">
                    <img src={imgDecorBottomRight} alt="bg-banner" />
                </div>
                <div className="absolute top-0 left-0 block lg:hidden translate-y-[-50%] z-10">
                    <img src={imgDecorLeftMb} alt="bg-banner" />
                </div>
                <div className="absolute top-0 right-0 block lg:hidden mix-blend-color-burn">
                    <img src={imgDecorRightMb} alt="bg-banner" />
                </div>

                {/* Centered tree illustration */}
                <div className="flex flex-col items-center pt-[120px] lg:pt-[28px] px-[20px] z-20 relative">
                    <div className="relative">
                        {/* Tree  */}
                        {hasImageS2 && (
                            <BannerImage
                                image={s2?.image}
                                imageMb={s2?.imageMb}
                                alt="Giá trị cốt lõi TAKYfood"
                                className="w-full max-w-[420px] h-auto lg:w-auto lg:max-w-[900px]"
                            />
                        )}
                    </div>
                </div>
            </section>

            <div className="relative w-full overflow-hidden bg-taiky-bg z-10">
                <div className="absolute bottom-0 right-0 z-10 mix-blend-color-burn hidden lg:block">
                    <img src={imgDecorCoreValue} alt="bg-banner" />
                </div>
                {/* GIÁ TRỊ CỐT LÕI — heading + dome/letters/values composite */}
                <Container>
                    <div className="relative mx-auto">
                        {/* Heading — centered above the dome */}
                        <h2 className="font-stamp font-normal text-center tracking-brand my-[20px] text-[28px] leading-[32px] lg:text-[48px] lg:leading-[48px] text-taiky-orange uppercase">
                            GIÁ TRỊ CỐT LÕI
                        </h2>
                    </div>
                    {/* Desktop: the dome + letters + values composite */}
                    <div className="lg:flex justify-center items-center">
                        {hasImage ? (
                            <BannerImage
                                image={s3?.image}
                                imageMb={s3?.imageMb}
                                alt="Giá trị cốt lõi TAKYfood"
                                className="w-full h-auto"
                            />
                        ) : (
                            <img
                                src={imgMainCore}
                                alt="Giá trị cốt lõi TAKYfood"
                                className="w-full h-auto"
                            />
                        )}
                    </div>

                    {/* Mobile: the five values as readable text */}
                    <ul className="lg:hidden mt-[24px] flex flex-col gap-[28px] text-center">
                        {CORE_VALUES.map((v) => (
                            <li key={v.title}>
                                <h3 className="font-stamp font-normal tracking-brand text-[26px] leading-[32px] text-taiky-orange uppercase">
                                    {v.title}
                                </h3>
                                <p className="mt-[10px] text-[15px] leading-[24px] text-taiky-darkbrown">
                                    {v.desc}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Container>
            </div>
        </>
    );
}
