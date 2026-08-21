import raw from './policies.json';
import type { Lang } from '../context/language';

export interface PolicySection {
    number: number;
    title: string;
    paragraphs: string[];
    bullets: string[];
}

export interface PolicyDocument {
    title: string;
    effectiveDate: string;
    intro: string[];
    sections: PolicySection[];
}

export type PolicyKey = 'terms' | 'privacy' | 'cookie';

const POLICIES = raw as Record<string, PolicyDocument>;

export function getPolicy(key: PolicyKey, lang: Lang): PolicyDocument {
    const suffix = lang === 'en' ? 'en' : 'vi';
    return POLICIES[`${key}_${suffix}`];
}
