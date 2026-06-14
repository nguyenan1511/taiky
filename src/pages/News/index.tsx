import EventHero from '../../components/EventHero';
import NewsList from '../../components/NewsList';

export default function News() {
    return (
        <main className="relative">
            <EventHero />
            <NewsList />
        </main>
    );
}
