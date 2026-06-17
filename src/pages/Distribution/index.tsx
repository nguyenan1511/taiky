import DomesticMarket from '../../components/DomesticMarket';
import InternationalMarket from '../../components/InternationalMarket';
import EnterpriseCustomers from '../../components/EnterpriseCustomers';
import ConsultForm from '../../components/ConsultForm';
import Commitment from '../../components/Commitment';
import Reveal from '../../components/Reveal';
import { PAGE } from '../../lib/api/pages';

export default function Distribution() {
    return (
        <main className="relative">
            <Reveal>
                <DomesticMarket />
            </Reveal>
            <Reveal>
                <InternationalMarket />
            </Reveal>
            <Reveal>
                <EnterpriseCustomers />
            </Reveal>
            <Reveal>
                <ConsultForm />
            </Reveal>
            <Reveal>
                <Commitment pageCode={PAGE.DISTRIBUTION} sectionId="5" />
            </Reveal>
        </main>
    );
}
