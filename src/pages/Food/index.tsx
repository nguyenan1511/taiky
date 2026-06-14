import FoodHero from '../../components/FoodHero';
import TodayEat from '../../components/TodayEat';
import FriedDishes from '../../components/FriedDishes';
import VietnameseCakes from '../../components/VietnameseCakes';
import OtherDishes from '../../components/OtherDishes';

export default function Food() {
    return (
        <main className="relative">
            <FoodHero />
            <TodayEat />
            <FriedDishes />
            <VietnameseCakes />
            <OtherDishes />
        </main>
    );
}
