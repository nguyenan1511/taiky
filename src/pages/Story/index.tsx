import StoryHero from '../../components/StoryHero';
import CoreValues from '../../components/CoreValues';
import Timeline from '../../components/Timeline';
import QualityCertifications from '../../components/QualityCertifications';
import Commitment from '../../components/Commitment';
import Reveal from '../../components/Reveal';
import { PAGE } from '../../lib/api/pages';

export default function Story() {
    return (
        <main className="relative">
            <StoryHero />
            <Reveal>
                <CoreValues />
            </Reveal>
            <Reveal>
                <Timeline />
            </Reveal>
            <Reveal>
                <QualityCertifications />
            </Reveal>
            <Reveal>
                <Commitment pageCode={PAGE.ABOUT_US} sectionId="6" />
            </Reveal>
        </main>
    );
}
