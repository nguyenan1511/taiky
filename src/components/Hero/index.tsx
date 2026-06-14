import Container from '../Container';

// Product bags
const imgBagLeft = '/images/hero-bag-left.png';
const imgBagRight = '/images/hero-bag-right.png';
const imgBagFront = '/images/hero-bag-front.png';
const imgBgBanner = '/images/bg-hero.png';
const imgSketch = '/images/hero-sketch.png';

export default function Hero() {
    return (
        <section className="relative w-full pt-[120px] min-h-[710px] flex flex-col justify-end">
            <div className="absolute top-0 right-0">
                <img src={imgBgBanner} alt="bg-banner" />
            </div>
            {/* Sketch overlay — spans hero→products */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none mix-blend-color-burn opacity-20 z-[1] right-0 bottom-0 translate-y-[50%]"
            >
                <img src={imgSketch} alt="" />
            </div>
            <Container className="w-full z-10">
                <div className="grid grid-cols-2 w-full gap-[97px]">
                    <div className="flex flex-col gap-[64px] items-center">
                        <div className="flex flex-col gap-[32px] items-center w-full">
                            <div className="flex flex-col gap-[12px] items-center">
                                <h1 className="font-stamp font-normal text-[48px] leading-[48px] text-taiky-orange uppercase whitespace-nowrap">
                                    Đậm chất bản Việt
                                </h1>
                                <p className="font-bold text-[40px] leading-[40px] text-taiky-brown whitespace-nowrap">
                                    Bánh TAKY
                                </p>
                            </div>
                            <p className="font-normal text-[16px] leading-[24px] text-taiky-darkbrown text-center [word-break:break-word] w-[466px]">
                                Dòng sản phẩm Taky hoàn hảo về chất lượng và đột phá trong từng
                                thiết kế bao bì mới. Mỗi tuyệt phẩm đến từ nhãn hàng Taky đều là một
                                sản phẩm quan trọng trong danh mục sản phẩm được ưa thích nhất. Xứng
                                đáng trở thành chuyên gia bột thực phẩm hàng đầu tại Việt Nam.
                            </p>
                        </div>

                        <button className="flex items-center justify-center px-[40px] py-[12px] drop-shadow-[2px_4px_2px_rgba(0,0,0,0.5)] bg-taiky-yellow">
                            <span className="font-bold text-taiky-brown text-[16px] leading-6 whitespace-nowrap [word-break:break-word]">
                                XEM CHI TIẾT
                            </span>
                        </button>
                    </div>

                    {/* Product bags — group origin x:695, y:284 */}
                    <div className="relative flex">
                        {/* Left bag: offset (0, 35), 262×378, rotate(-7.71deg) */}
                        <img src={imgBagLeft} alt="Bánh Taky" />
                        {/* Right bag: offset (413, 7), 262×378, rotate(4.68deg) */}
                        <img src={imgBagRight} alt="Bánh Taky" className="absolute top-0 left-0" />
                        {/* Front bag: offset (220, 48), 262×378 */}
                        <img src={imgBagFront} alt="Bánh Taky" className="absolute top-0 left-0" />
                    </div>
                </div>
            </Container>
        </section>
    );
}
