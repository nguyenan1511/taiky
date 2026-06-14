import Container from '../Container';
import RecipeItem, { type Recipe } from '../RecipeItem';
import Pagination from '../Pagination';

/**
 * "MÓN NGON KHÁC" — other-recipe grid with pagination.
 * Cards use the shared RecipeItem component with mock data.
 */

const RECIPES: Recipe[] = [
    {
        title: 'Bánh pizza',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-1.jpg',
    },
    {
        title: 'Bánh comboloni táo',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-2.jpg',
    },
    {
        title: 'Bánh Donut',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-1.jpg',
    },
    {
        title: 'Bánh nậm kiểu Thái',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-2.jpg',
    },
    {
        title: 'Bánh Pancake',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-1.jpg',
    },
    {
        title: 'Chè bưởi',
        people: '3 Người',
        time: '30 Phút',
        difficulty: 'Dễ',
        image: '/images/food-2.jpg',
    },
];

const imgDecorLeft = '/images/decor-timeline-1.png';
const imgSketch = '/images/decor-bottom-catalog.jpg';

export default function OtherDishes() {
    return (
        <section className="relative w-full overflow-visible bg-taiky-bg z-10">
            <div className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[50%] z-1">
                <img src={imgSketch} alt="bg-banner" />
            </div>
            <div className="absolute top-0 left-0 mix-blend-color-burn">
                <img src={imgDecorLeft} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[38px] py-[40px] relative z-10">
                <h2 className="font-stamp font-normal tracking-brand text-[36px] leading-[44px] text-taiky-orange uppercase text-center">
                    MÓN NGON KHÁC
                </h2>

                <div className="grid w-full grid-cols-3 gap-x-[24px] gap-y-[40px]">
                    {RECIPES.map((recipe, i) => (
                        <RecipeItem key={`${recipe.title}-${i}`} {...recipe} />
                    ))}
                </div>

                <Pagination className="mt-[12px]" />
            </Container>
        </section>
    );
}
