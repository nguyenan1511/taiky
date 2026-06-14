import Container from '../Container';

const img1 = '/images/food-img-1.png';
const img2 = '/images/food-img-2.png';
const img3 = '/images/food-img-3.png';
const img4 = '/images/food-img-4.png';
const img5 = '/images/food-img-5.png';

export default function FoodBowls() {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Background texture */}
            <Container className="relative px-8 md:px-16">
                {/* Top row: 3 bowls (2 sides + large center) */}
                <div className="relative">
                    <img src={img1} alt="Món ăn" className="" />
                    <img src={img2} alt="Món ăn" className="absolute inset-0" />
                    <img src={img3} alt="Món ăn" className="absolute inset-0" />
                    <img src={img4} alt="Món ăn" className="absolute inset-0" />
                    <img src={img5} alt="Món ăn" className="absolute inset-0" />
                </div>
                <div className="flex justify-center mt-[-40px] mb-[40px] relative z-10">
                    <button className="px-[40px] py-[12px] font-bold text-[16px] leading-6 uppercase text-taiky-orange border-[2px] border-taiky-orange bg-transparent">
                        XEM CHI TIẾT
                    </button>
                </div>
            </Container>
        </section>
    );
}
