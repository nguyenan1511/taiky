import { Link } from 'react-router-dom';
import Container from '../Container';
import { useDocumentMeta } from '../../hooks/usePageMeta';
import type { PolicyDocument, PolicyKey } from '../../content/policies';

type ContentBlock =
    | { kind: 'paragraph'; text: string }
    | { kind: 'list'; intro?: string; items: string[] };

const LIST_INTRO = /(?:sau|following purposes|must not|không được|including the following)\s*:$/i;

function looksLikeListItem(text: string) {
    return (
        text.endsWith(';') ||
        text.endsWith('; hoặc') ||
        text.endsWith('; và') ||
        text.endsWith(' or') ||
        text.endsWith('; or')
    );
}

function parseParagraphs(paragraphs: string[]): ContentBlock[] {
    const blocks: ContentBlock[] = [];
    let i = 0;

    while (i < paragraphs.length) {
        const text = paragraphs[i];

        if (text.endsWith(':') && LIST_INTRO.test(text) && i + 1 < paragraphs.length) {
            const items: string[] = [];
            let j = i + 1;

            while (j < paragraphs.length) {
                const next = paragraphs[j];
                const isItem =
                    looksLikeListItem(next) ||
                    (items.length > 0 && /^[a-z]/.test(next) && next.length < 320);

                if (!isItem) break;
                items.push(next);
                j++;
                if (!looksLikeListItem(next)) break;
            }

            if (items.length >= 2) {
                blocks.push({ kind: 'list', intro: text, items });
                i = j;
                continue;
            }
        }

        if (text.endsWith(':') && i + 1 < paragraphs.length) {
            const items: string[] = [];
            let j = i + 1;

            while (j < paragraphs.length) {
                const next = paragraphs[j];
                if (!/^[a-z]/.test(next) && items.length === 0) break;
                if (/^[A-Z]/.test(next) && !looksLikeListItem(next) && items.length === 0) break;

                const isItem =
                    looksLikeListItem(next) ||
                    (items.length > 0 && /^[a-z]/.test(next) && next.length < 320);

                if (!isItem) break;
                items.push(next);
                j++;
                if (!looksLikeListItem(next)) break;
            }

            if (items.length >= 2) {
                blocks.push({ kind: 'list', intro: text, items });
                i = j;
                continue;
            }
        }

        blocks.push({ kind: 'paragraph', text });
        i++;
    }

    return blocks;
}

function renderInlineLinks(text: string) {
    const parts = text.split(/(Chính sách Bảo mật Thông tin|Chính sách Cookie|Privacy Policy|Cookie Policy|Điều khoản Sử dụng|Terms of Use)/g);

    if (parts.length === 1) return text;

    return parts.map((part, index) => {
        if (part === 'Chính sách Bảo mật Thông tin' || part === 'Privacy Policy') {
            return (
                <Link key={index} to="/privacy-policy" className="underline hover:text-taiky-orange">
                    {part}
                </Link>
            );
        }
        if (part === 'Chính sách Cookie' || part === 'Cookie Policy') {
            return (
                <Link key={index} to="/cookie-policy" className="underline hover:text-taiky-orange">
                    {part}
                </Link>
            );
        }
        if (part === 'Điều khoản Sử dụng' || part === 'Terms of Use') {
            return (
                <Link key={index} to="/terms-of-use" className="underline hover:text-taiky-orange">
                    {part}
                </Link>
            );
        }
        return part;
    });
}

function renderBullet(text: string) {
    const emailMatch = text.match(/^Email:\s*(.+)$/i);
    if (emailMatch) {
        return (
            <>
                Email:{' '}
                <a href={`mailto:${emailMatch[1]}`} className="underline hover:text-taiky-orange">
                    {emailMatch[1]}
                </a>
            </>
        );
    }
    return renderInlineLinks(text);
}

function SectionContent({ section }: { section: PolicyDocument['sections'][number] }) {
    const blocks = parseParagraphs(section.paragraphs);

    return (
        <section className="flex flex-col gap-4">
            <h2 className="font-bold text-[18px] leading-[26px] text-taiky-brown lg:text-[20px] lg:leading-[28px]">
                {section.number}. {section.title}
            </h2>

            <div className="flex flex-col gap-3 text-[15px] leading-[24px] text-taiky-darkbrown lg:text-[16px] lg:leading-[26px]">
                {blocks.map((block, index) => {
                    if (block.kind === 'list') {
                        return (
                            <div key={index} className="flex flex-col gap-3">
                                {block.intro && <p>{renderInlineLinks(block.intro)}</p>}
                                <ul className="list-disc pl-6 flex flex-col gap-2">
                                    {block.items.map((item) => (
                                        <li key={item}>{renderInlineLinks(item)}</li>
                                    ))}
                                </ul>
                            </div>
                        );
                    }

                    return <p key={index}>{renderInlineLinks(block.text)}</p>;
                })}

                {section.bullets.length > 0 && (
                    <ul className="list-none flex flex-col gap-1 pl-0">
                        {section.bullets.map((item) => (
                            <li key={item}>{renderBullet(item)}</li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

interface PolicyPageProps {
    policy: PolicyDocument;
    metaDescription: string;
    relatedLinks?: Array<{ label: string; to: string }>;
}

export default function PolicyPage({ policy, metaDescription, relatedLinks = [] }: PolicyPageProps) {
    useDocumentMeta({ title: `${policy.title} | TAKYfood`, description: metaDescription });

    return (
        <main className="relative bg-taiky-bg pt-[80px] lg:pt-[120px] pb-[80px]">
            <Container className="px-6 sm:px-8 md:px-[80px]">
                <div className="mx-auto flex max-w-[920px] flex-col gap-10 pt-8">
                    <header className="flex flex-col gap-4 border-b border-taiky-lightbrown/30 pb-8">
                        <h1 className="font-stamp font-normal tracking-brand text-[28px] leading-[34px] text-taiky-orange uppercase lg:text-[44px] lg:leading-[48px]">
                            {policy.title}
                        </h1>
                        <p className="text-[14px] font-bold uppercase tracking-[0.04em] text-taiky-lightbrown">
                            {policy.effectiveDate}
                        </p>
                        <div className="flex flex-col gap-3 text-[15px] leading-[24px] text-taiky-darkbrown lg:text-[16px] lg:leading-[26px]">
                            {policy.intro.map((paragraph) => (
                                <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                            ))}
                        </div>
                    </header>

                    <div className="flex flex-col gap-10">
                        {policy.sections.map((section) => (
                            <SectionContent key={section.number} section={section} />
                        ))}
                    </div>

                    {relatedLinks.length > 0 && (
                        <nav
                            aria-label="Related policies"
                            className="flex flex-wrap gap-x-6 gap-y-2 border-t border-taiky-lightbrown/30 pt-8 text-[14px] font-bold text-taiky-brown"
                        >
                            {relatedLinks.map((link) => (
                                <Link key={link.to} to={link.to} className="underline hover:text-taiky-orange">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    )}
                </div>
            </Container>
        </main>
    );
}

export function relatedPolicyLinks(key: PolicyKey, lang: 'vi' | 'en') {
    const labels =
        lang === 'en'
            ? {
                  terms: 'Terms of Use',
                  privacy: 'Privacy Policy',
                  cookie: 'Cookie Policy',
              }
            : {
                  terms: 'Điều khoản sử dụng',
                  privacy: 'Chính sách bảo mật',
                  cookie: 'Chính sách Cookie',
              };

    const all: Array<{ key: PolicyKey; to: string }> = [
        { key: 'terms', to: '/terms-of-use' },
        { key: 'privacy', to: '/privacy-policy' },
        { key: 'cookie', to: '/cookie-policy' },
    ];

    return all.filter((item) => item.key !== key).map((item) => ({ to: item.to, label: labels[item.key] }));
}
