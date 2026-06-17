import Container from '../Container';
import RecipeItem, { type Recipe } from '../RecipeItem';

/**
 * "MÓN CHIÊN ĐẤT BẠI" — fried-dish recipe cards with a "XEM THÊM" link.
 * Cards use the shared RecipeItem component with mock data.
 */

const RECIPES: Recipe[] = [
    {
        title: 'Tôm tẩm bột chiên giòn',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-1.jpg',
    },
    {
        title: 'Gà tẩm bột chiên giòn',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-2.jpg',
    },
    {
        title: 'Cá tẩm bột chiên giòn',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-1.jpg',
    },
];

function MoreLink() {
    return (
        <a
            href="#"
            className="absolute right-0 flex items-center gap-[8px] text-[13px] font-bold uppercase tracking-[0.06em] text-taiky-yellow transition hover:opacity-80"
        >
            Xem thêm
            <svg
                width="20"
                height="14"
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
        </a>
    );
}

const imgDecorLeft = '/images/decor-timeline-1.png';

export default function FriedDishes() {
    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <div className="absolute top-0 left-0 mix-blend-color-burn">
                <img src={imgDecorLeft} alt="bg-banner" />
            </div>
            <Container className="flex flex-col gap-[24px] lg:gap-[38px] py-[40px] relative z-10">
                <div className="relative flex items-center justify-center">
                    <h2 className="font-stamp font-normal tracking-brand text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] text-taiky-orange uppercase text-center">
                        MÓN CHIÊN ĐẤT BẠI
                    </h2>
                    <div className="hidden lg:block">
                        <MoreLink />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                    {RECIPES.map((recipe) => (
                        <RecipeItem key={recipe.title} {...recipe} />
                    ))}
                </div>

                <a
                    href="#"
                    className="lg:hidden self-center inline-flex items-center justify-center bg-taiky-yellow px-[40px] py-[12px] text-[14px] font-bold uppercase tracking-[0.04em] text-taiky-brown transition hover:opacity-90"
                >
                    Xem thêm
                </a>
            </Container>
        </section>
    );
}
