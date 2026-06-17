import Hero from '../../components/Hero';
import Products from '../../components/Products';
import KitchenCorner from '../../components/KitchenCorner';
import FoodBowls from '../../components/FoodBowls';
import Commitment from '../../components/Commitment';
import Reveal from '../../components/Reveal';

export default function Home() {
    return (
        <main className="relative">
            <Hero />
            <Reveal>
                <Products />
            </Reveal>
            <Reveal>
                <KitchenCorner />
            </Reveal>
            <Reveal>
                <FoodBowls />
            </Reveal>
            <Reveal>
                <Commitment />
            </Reveal>
        </main>
    );
}
