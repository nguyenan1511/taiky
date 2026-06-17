import FoodHero from '../../components/FoodHero';
import TodayEat from '../../components/TodayEat';
import FriedDishes from '../../components/FriedDishes';
import VietnameseCakes from '../../components/VietnameseCakes';
import OtherDishes from '../../components/OtherDishes';
import Reveal from '../../components/Reveal';

export default function Food() {
    return (
        <main className="relative">
            <FoodHero />
            <Reveal>
                <TodayEat />
            </Reveal>
            <Reveal>
                <FriedDishes />
            </Reveal>
            <Reveal>
                <VietnameseCakes />
            </Reveal>
            <Reveal>
                <OtherDishes />
            </Reveal>
        </main>
    );
}
