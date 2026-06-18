/**
 * "HÀNH TRÌNH 50 NĂM" — core-values section: the 50-year tree mark above the
 * "GIÁ TRỊ CỐT LÕI" composition — an orange dome (main-core) ringed by the
 * five TAIKY letter circles and the five value blocks.
 */

import Container from '../Container';
import BannerImage from '../BannerImage';
import { usePage } from '../../lib/api/queries';
import { PAGE, pageSection } from '../../lib/api/pages';

const imgDecorTopleft = '/images/decor-orange.png';
const imgDecorBottomRight = '/images/decor-foodbowls-2.png';
const imgMainCore = '/images/corevalue.png';
const imgDecorCoreValue = '/images/decor-core-value.png';

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
                <div className="absolute top-0 left-0 translate-x-[-25%] translate-y-[-50%]">
                    <img src={imgDecorTopleft} alt="bg-banner" />
                </div>
                <div className="absolute top-0 right-0 translate-x-[60%]">
                    <img src={imgDecorBottomRight} alt="bg-banner" />
                </div>

                {/* Centered tree illustration */}
                <div className="flex flex-col items-center pt-[28px] px-[20px]">
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
                        <h2 className="font-stamp font-normal text-center tracking-brand text-[28px] leading-[32px] lg:text-[48px] lg:leading-[48px] text-taiky-orange uppercase">
                            GIÁ TRỊ CỐT LÕI
                        </h2>
                    </div>
                    <div className="flex justify-center items-center">
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
                </Container>
            </div>
        </>
    );
}
