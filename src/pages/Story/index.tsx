import StoryHero from '../../components/StoryHero';
import CoreValues from '../../components/CoreValues';
import Timeline from '../../components/Timeline';
import QualityCertifications from '../../components/QualityCertifications';
import Commitment from '../../components/Commitment';

export default function Story() {
    return (
        <main className="relative">
            <StoryHero />
            <CoreValues />
            <Timeline />
            <QualityCertifications />
            <Commitment />
        </main>
    );
}
