import ProductHero from '../../components/ProductHero';
import FeaturedProducts from '../../components/FeaturedProducts';
import ProductCatalog from '../../components/ProductCatalog';

export default function Products() {
    return (
        <main className="relative">
            <ProductHero />
            <FeaturedProducts />
            <ProductCatalog />
        </main>
    );
}
