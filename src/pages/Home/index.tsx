import Hero from '../../components/Hero';
import Products from '../../components/Products';
import KitchenCorner from '../../components/KitchenCorner';
import FoodBowls from '../../components/FoodBowls';
import Commitment from '../../components/Commitment';

export default function Home() {
    return (
        <main className="relative">
            <Hero />
            <Products />
            <KitchenCorner />
            <FoodBowls />
            <Commitment />
        </main>
    );
}
