import PolicyPage, { relatedPolicyLinks } from '../../components/PolicyPage';
import { getPolicy } from '../../content/policies';
import { useLanguage } from '../../context/language';

export default function TermsOfUse() {
    const { lang } = useLanguage();
    const policy = getPolicy('terms', lang);

    return (
        <PolicyPage
            policy={policy}
            metaDescription={policy.intro[0]}
            relatedLinks={relatedPolicyLinks('terms', lang)}
        />
    );
}
