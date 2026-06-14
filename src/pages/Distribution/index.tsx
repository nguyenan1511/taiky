import DomesticMarket from '../../components/DomesticMarket';
import InternationalMarket from '../../components/InternationalMarket';
import EnterpriseCustomers from '../../components/EnterpriseCustomers';
import ConsultForm from '../../components/ConsultForm';
import Commitment from '../../components/Commitment';

export default function Distribution() {
    return (
        <main className="relative">
            <DomesticMarket />
            <InternationalMarket />
            <EnterpriseCustomers />
            <ConsultForm />
            <Commitment />
        </main>
    );
}
