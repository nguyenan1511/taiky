import Container from '../Container';
import BannerImage from '../BannerImage';
import { usePage } from '../../lib/api/queries';
import { PAGE, pageSection } from '../../lib/api/pages';

const img1 = '/images/food-img-1.png';
const img2 = '/images/food-img-2.png';
const img3 = '/images/food-img-3.png';
const img4 = '/images/food-img-4.png';
const img5 = '/images/food-img-5.png';

export default function FoodBowls() {
    // HOME page CMS section 4: the bowls composition image.
    const { data } = usePage(PAGE.HOME);
    const s4 = pageSection(data?.data, '4');
    const hasImage = Boolean(s4?.image || s4?.imageMb);

    return (
        <section className="relative w-full overflow-hidden">
            {/* Background texture */}
            <Container className="relative px-4 sm:px-8 md:px-16">
                {/* Bowls composition — CMS image when present, else the local layers */}
                {hasImage ? (
                    <BannerImage
                        image={s4?.image}
                        imageMb={s4?.imageMb}
                        alt="Món ăn"
                        className="w-full h-auto"
                    />
                ) : (
                    <div className="relative">
                        <img src={img1} alt="Món ăn" className="w-full h-auto" />
                        <img
                            src={img2}
                            alt="Món ăn"
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                        <img
                            src={img3}
                            alt="Món ăn"
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                        <img
                            src={img4}
                            alt="Món ăn"
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                        <img
                            src={img5}
                            alt="Món ăn"
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                    </div>
                )}
                <div className="flex justify-center mt-[-24px] lg:mt-[-40px] mb-[40px] relative z-10">
                    <button className="px-[32px] lg:px-[40px] py-[10px] lg:py-[12px] font-bold text-[14px] lg:text-[16px] leading-6 uppercase text-taiky-orange border-[2px] border-taiky-orange bg-transparent">
                        XEM CHI TIẾT
                    </button>
                </div>
            </Container>
        </section>
    );
}
