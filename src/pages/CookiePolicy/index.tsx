import PolicyPage, { relatedPolicyLinks } from '../../components/PolicyPage';
import { getPolicy } from '../../content/policies';
import { useLanguage } from '../../context/language';

export default function CookiePolicy() {
    const { lang } = useLanguage();
    const policy = getPolicy('cookie', lang);

    return (
        <PolicyPage
            policy={policy}
            metaDescription={policy.intro[1]}
            relatedLinks={relatedPolicyLinks('cookie', lang)}
        />
    );
}
