/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { ArrowLeft, Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  getStoredWebsiteLocale,
  getWebsiteAssetUrl,
  getWebsiteBrowserStorage,
  saveWebsiteLocale,
  type WebsiteLocale,
} from './websiteContent';
import { privacyPolicyContentByLocale } from './privacyPolicyContent';

const logo = getWebsiteAssetUrl(import.meta.env.BASE_URL, 'logo.png');

export function PrivacyPolicyApp() {
  const [locale, setLocale] = useState<WebsiteLocale>(() => getStoredWebsiteLocale(getWebsiteBrowserStorage()));
  const content = privacyPolicyContentByLocale[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function handleLocaleChange(nextLocale: WebsiteLocale): void {
    setLocale(nextLocale);
    saveWebsiteLocale(getWebsiteBrowserStorage(), nextLocale);
  }

  return (
    <main className="privacy-policy-shell">
      <header className="privacy-policy-header">
        <a className="privacy-policy-brand" href="/"><img src={logo} alt="openSider" />{content.brandName}</a>
        <div aria-label={content.localeToggleLabel} className="privacy-policy-locale-switcher">
          <Languages aria-hidden="true" size={17} />
          <button aria-label="EN" aria-pressed={locale === 'en'} onClick={() => handleLocaleChange('en')} type="button">EN</button>
          <button aria-label="中文" aria-pressed={locale === 'zh-CN'} onClick={() => handleLocaleChange('zh-CN')} type="button">中文</button>
        </div>
      </header>

      <article className="privacy-policy-document">
        <a className="privacy-policy-home-link" href="/"><ArrowLeft aria-hidden="true" size={16} />{content.homeLabel}</a>
        <p className="privacy-policy-kicker">openSider</p>
        <h1>{content.title}</h1>
        <p className="privacy-policy-updated">{content.updatedLabel}: {content.updatedDate}</p>

        <section className="privacy-policy-limited-use" aria-labelledby="limited-use-title">
          <h2 id="limited-use-title">{content.limitedUseTitle}</h2>
          <p>{content.limitedUseStatement}</p>
        </section>

        {content.sections.map((section) => (
          <section className="privacy-policy-section" key={section.id} aria-labelledby={`privacy-policy-${section.id}`}>
            <h2 id={`privacy-policy-${section.id}`}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
      </article>

      <footer className="privacy-policy-footer">
        <span>© {new Date().getFullYear()} openSider</span>
        <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
      </footer>
    </main>
  );
}
