/**
 * "HÀNH TRÌNH 50 NĂM" — core-values section: the 50-year tree mark above the
 * "GIÁ TRỊ CỐT LÕI" composition — an orange dome (main-core) ringed by the
 * five TAIKY letter circles and the five value blocks.
 */

import Container from '../Container';

const imgTree = '/images/kitchen-tree.png';
const imgTextLeft = '/images/text-left.png';
const imgTextRight = '/images/text-right.png';
const imgDecorTopleft = '/images/decor-orange.png';
const imgDecorBottomRight = '/images/decor-foodbowls-2.png';
const imgMainCore = '/images/corevalue.png';
const imgDecorCoreValue = '/images/decor-core-value.png';

export default function CoreValues() {
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
                <div className="flex flex-col items-center pt-[80px]">
                    <div className="relative">
                        {/* Tree */}
                        <img src={imgTree} alt="50 năm TAIKYFOOD" />
                        <img
                            src={imgTextLeft}
                            alt="imgTextLeft"
                            className="absolute bottom-[100px] left-[-180px]"
                        />
                        <img
                            src={imgTextRight}
                            alt="imgTextRight"
                            className="absolute bottom-[100px] right-[0px]"
                        />
                    </div>
                </div>
            </section>

            <div className="relative w-full overflow-hidden bg-taiky-bg z-10 mt-[-40px]">
                <div className="absolute bottom-0 right-0 z-10 mix-blend-color-burn">
                    <img src={imgDecorCoreValue} alt="bg-banner" />
                </div>
                {/* GIÁ TRỊ CỐT LÕI — fixed-size canvas: heading + dome + letters + values */}
                <Container>
                    <div className="relative mx-auto">
                        {/* Heading — centered above the dome */}
                        <h2 className="font-stamp font-normal text-center tracking-brand text-[48px] leading-[48px] text-taiky-orange uppercase">
                            GIÁ TRỊ CỐT LÕI
                        </h2>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src={imgMainCore} alt="bg-banner" />
                    </div>
                </Container>
            </div>
        </>
    );
}
