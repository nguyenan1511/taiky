import PolicyPage, { relatedPolicyLinks } from '../../components/PolicyPage';
import { getPolicy } from '../../content/policies';
import { useLanguage } from '../../context/language';

export default function PrivacyPolicy() {
    const { lang } = useLanguage();
    const policy = getPolicy('privacy', lang);

    return (
        <PolicyPage
            policy={policy}
            metaDescription={policy.intro[1]}
            relatedLinks={relatedPolicyLinks('privacy', lang)}
        />
    );
}
