import EventHero from '../../components/EventHero';
import NewsList from '../../components/NewsList';
import Reveal from '../../components/Reveal';

export default function News() {
    return (
        <main className="relative">
            <EventHero />
            <Reveal>
                <NewsList />
            </Reveal>
        </main>
    );
}
