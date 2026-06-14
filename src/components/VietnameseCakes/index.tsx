import Container from '../Container';
import RecipeItem, { type Recipe } from '../RecipeItem';

/**
 * "NGHIỆN BÁNH VIỆT" — Vietnamese-cake recipe cards with a "XEM THÊM" link.
 * Cards use the shared RecipeItem component with mock data.
 */

const RECIPES: Recipe[] = [
    {
        title: 'Bánh chuối hấp',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-1.jpg',
    },
    {
        title: 'Bánh bông lan rắc đường',
        people: '3 Người',
        time: '10 Phút',
        difficulty: 'Dễ',
        image: '/images/food-2.jpg',
    },
    {
        title: 'Bánh kem bông lan',
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

export default function VietnameseCakes() {
    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <Container className="flex flex-col gap-[38px] py-[40px]">
                <div className="relative flex items-center justify-center">
                    <h2 className="font-stamp font-normal tracking-brand text-[36px] leading-[44px] text-taiky-orange uppercase text-center">
                        NGHIỆN BÁNH VIỆT
                    </h2>
                    <MoreLink />
                </div>

                <div className="grid grid-cols-3 gap-[24px]">
                    {RECIPES.map((recipe) => (
                        <RecipeItem key={recipe.title} {...recipe} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
