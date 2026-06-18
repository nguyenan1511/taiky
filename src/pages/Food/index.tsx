import FoodHero from '../../components/FoodHero';
import TodayEat from '../../components/TodayEat';
import CulinarySection from '../../components/CulinarySection';
import Reveal from '../../components/Reveal';
import { useCulinaryCategories } from '../../lib/api/queries';

export default function Food() {
    // Recipe sections are driven by the culinary categories list (ordered by `sort`);
    // each category renders its own section of recipes.
    const { data } = useCulinaryCategories();
    const categories = [...(data?.data ?? [])].sort((a, b) => a.sort - b.sort);

    return (
        <main className="relative">
            <FoodHero />
            <Reveal>
                <TodayEat />
            </Reveal>
            {categories.map((category) => (
                <Reveal key={category.id}>
                    <CulinarySection category={category} />
                </Reveal>
            ))}
        </main>
    );
}
