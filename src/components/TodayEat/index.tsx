import { useState } from 'react';
import Container from '../Container';
import RecipeMeta from '../RecipeMeta';

/**
 * "HÔM NAY ĂN GÌ" — featured-recipe slider. Each slide is a split card: a
 * lined-paper info panel (title + meta + summary + CTA) beside the dish photo.
 */

const imgBg = '/images/bg-eat.jpg';

const imgDecorTopleft = '/images/decor-foodbowls.png';

const imgDecorTopRight = '/images/decor-core-value.png';

type Recipe = {
    title: string;
    people: string;
    time: string;
    difficulty: string;
    description: string;
    image: string;
};

// Mock data — replace with a real recipe feed later.
const RECIPES: Recipe[] = [
    {
        title: 'Cách làm Bánh chuối hấp',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        description:
            'Vỏ giòn rụm, bên trong mềm mịn, hòa quyện cùng vị ngọt dịu khiến ai cũng mê ngay từ lần thử đầu tiên.',
        image: '/images/eat-1.jpg',
    },
    {
        title: 'Cách làm Bánh bông lan',
        people: '4 Người',
        time: '45 Phút',
        difficulty: 'Trung bình',
        description:
            'Cốt bánh xốp mềm, thơm bơ trứng, ngọt vừa phải — món tráng miệng quen thuộc cho cả gia đình.',
        image: '/images/eat-2.jpg',
    },
    {
        title: 'Cách làm Bánh kem bông lan',
        people: '6 Người',
        time: '60 Phút',
        difficulty: 'Dễ',
        description:
            'Lớp kem tươi mát lạnh phủ trên cốt bánh mềm ẩm, điểm thêm trái cây tươi cho ngày đặc biệt.',
        image: '/images/eat-1.jpg',
    },
];

export default function TodayEat() {
    const [index, setIndex] = useState(0);
    const recipe = RECIPES[index];

    const go = (delta: number) => setIndex((i) => (i + delta + RECIPES.length) % RECIPES.length);

    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <div className="absolute top-0 left-0 translate-x-[-30%]">
                <img src={imgDecorTopleft} alt="bg-banner" />
            </div>
            <div className="absolute top-[60px] right-0 mix-blend-color-burn">
                <img src={imgDecorTopRight} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[24px] py-[60px] relative z-10">
                {/* Heading */}
                <h2 className="font-stamp font-normal tracking-brand text-[44px] leading-[48px] text-taiky-orange uppercase text-center">
                    HÔM NAY ĂN GÌ
                </h2>
                <p className="text-[20px] leading-[28px] tracking-[0.04em] text-taiky-lightbrown uppercase font-bold">
                    <span className="font-bold text-taiky-brown">Bữa ăn gia đình</span> thêm trọn vị
                    khi có <span className="font-bold text-taiky-brown">TAKYFOOD</span>
                </p>

                {/* Slider */}
                <div className="relative w-full px-[60px] pt-[20px]">
                    {/* Prev */}
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Công thức trước"
                        className="absolute left-0 top-1/2 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center text-taiky-yellow transition hover:opacity-80"
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
                        >
                            <path d="M19 12H5M11 6l-6 6 6 6" />
                        </svg>
                    </button>

                    {/* Slide — fixed height so the frame never shifts between slides */}
                    <div className="grid h-[450px] grid-cols-2 overflow-hidden rounded-md">
                        {/* Lined-paper info panel */}
                        <div className="relative">
                            <img
                                src={imgBg}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="relative z-10 flex h-full flex-col justify-center px-[48px] py-[56px]">
                                <h3 className="text-[28px] font-bold leading-[34px] text-taiky-brown">
                                    {recipe.title}
                                </h3>
                                <RecipeMeta
                                    people={recipe.people}
                                    time={recipe.time}
                                    difficulty={recipe.difficulty}
                                    className="mt-[20px] gap-x-[28px] text-[15px]"
                                />
                                <p className="mt-[24px] max-w-[460px] text-[16px] leading-[26px] text-taiky-brown">
                                    {recipe.description}
                                </p>
                                <button
                                    type="button"
                                    className="mt-[32px] w-fit bg-taiky-yellow px-[36px] py-[14px]"
                                >
                                    <span className="text-[15px] font-bold uppercase tracking-[0.06em] text-taiky-brown">
                                        Xem chi tiết
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Dish photo */}
                        <div className="relative">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Next */}
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Công thức sau"
                        className="absolute right-0 top-1/2 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center text-taiky-yellow transition hover:opacity-80"
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
                        >
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </button>
                </div>
            </Container>
        </section>
    );
}
