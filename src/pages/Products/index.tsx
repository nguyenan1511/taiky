import ProductHero from '../../components/ProductHero';
import FeaturedProducts from '../../components/FeaturedProducts';
import ProductCatalog from '../../components/ProductCatalog';
import Reveal from '../../components/Reveal';

export default function Products() {
    return (
        <main className="relative">
            <ProductHero />
            <Reveal>
                <FeaturedProducts />
            </Reveal>
            <Reveal>
                <ProductCatalog />
            </Reveal>
        </main>
    );
}
