/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { useEffect, useState } from 'react';
import { Check, Chrome, Languages, Menu, Sparkles, WandSparkles } from 'lucide-react';
import {
  CHROME_WEB_STORE_URL,
  getWebsiteAssetUrl,
  getStoredWebsiteLocale,
  getWebsiteBrowserStorage,
  saveWebsiteLocale,
  type WebsiteLocale,
  websiteContentByLocale,
} from './websiteContent';

const logo = getWebsiteAssetUrl(import.meta.env.BASE_URL, 'logo.png');
const featureIcons = { chat: Sparkles, translate: Languages, agent: WandSparkles, byok: Check };

export function ProductWebsiteApp() {
  const [locale, setLocale] = useState<WebsiteLocale>(() => getStoredWebsiteLocale(getWebsiteBrowserStorage()));
  const content = websiteContentByLocale[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function handleLocaleChange(nextLocale: WebsiteLocale): void {
    setLocale(nextLocale);
    saveWebsiteLocale(getWebsiteBrowserStorage(), nextLocale);
  }

  return (
    <main className="product-website-shell">
      <header className="website-header">
        <a className="website-brand" href="#top"><img src={logo} alt="openSider" />openSider</a>
        <nav>{content.navigation.map((item) => <a className="website-nav-link" key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <details>
          <summary className="website-menu-summary"><Menu aria-hidden="true" size={20} /><span className="sr-only">{content.menuLabel}</span></summary>
          <div className="website-menu">{content.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
        </details>
        <div aria-label={content.localeToggleLabel} className="website-locale-switcher">
          <button aria-label="EN" aria-pressed={locale === 'en'} onClick={() => handleLocaleChange('en')} type="button">EN</button>
          <button aria-label="中文" aria-pressed={locale === 'zh-CN'} onClick={() => handleLocaleChange('zh-CN')} type="button">中文</button>
        </div>
        <a className="website-install-link website-install-link--small" href={CHROME_WEB_STORE_URL} target="_blank" rel="noreferrer"><Chrome aria-hidden="true" size={16} />{content.installLabel}</a>
      </header>

      <section id="top" className="website-hero">
        <div>
          <p className="website-kicker">{content.hero.kicker} <span>✦</span></p>
          <h1>{content.hero.title[0]}<br />{content.hero.title[1]}</h1>
          <p className="website-lede">{content.hero.description}</p>
          <div className="website-actions">
            <a className="website-install-link" href={CHROME_WEB_STORE_URL} target="_blank" rel="noreferrer"><Chrome aria-hidden="true" size={19} />{content.installLabel}</a>
            <a className="website-text-link" href="#features">{content.hero.exploreLabel}</a>
          </div>
          <p className="website-note">{content.hero.note}</p>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orb hero-orb--mint" /><div className="hero-orb hero-orb--coral" />
          <div className="browser-card"><div className="browser-top"><span /><span /><span /><b>openSider</b></div><div className="browser-body"><aside><img src={logo} alt="" /><i /><i /><i /></aside><article><p>{content.hero.visualQuestion}</p><div className="prompt-bubble">{content.hero.visualPrompt} <Sparkles size={15} /></div><div className="answer-bubble">{content.hero.visualAnswer}</div></article></div></div>
          <div className="floating-card">{content.hero.visualTranslation} <Languages size={18} /></div>
        </div>
      </section>

      <section id="features" className="website-section">
        <p className="section-label">{content.featuresLabel}</p><h2>{content.featuresTitle[0]}<br />{content.featuresTitle[1]}</h2>
        <div className="feature-grid">{content.features.map((feature) => { const Icon = featureIcons[feature.id]; return <article className={`website-feature-card ${feature.accentClassName}`} key={feature.id}><Icon aria-hidden="true" size={25} /><p>{feature.eyebrow}</p><h3>{feature.title}</h3><span>{feature.description}</span></article>; })}</div>
      </section>

      <section id="use-cases" className="website-section use-case-section">
        <p className="section-label">{content.useCasesLabel}</p><h2>{content.useCasesTitle[0]}<br />{content.useCasesTitle[1]}</h2>
        <div className="use-case-grid">{content.useCases.map((useCase) => <article className="use-case" key={useCase.step}><b>{useCase.step}</b><h3>{useCase.title}</h3><p>{useCase.description}</p><code>“{useCase.prompt}”</code></article>)}</div>
      </section>

      <section id="privacy" className="trust-section">
        <div><p className="section-label">{content.privacyLabel}</p><h2>{content.privacyTitle[0]}<br />{content.privacyTitle[1]}</h2></div>
        <ul>{content.trustPoints.map((point) => <li key={point}><Check aria-hidden="true" /> {point}</li>)}</ul>
      </section>

      <footer><div><a className="website-brand" href="#top"><img src={logo} alt="openSider" />openSider</a><p>{content.footerDescription}</p></div><a className="website-install-link" href={CHROME_WEB_STORE_URL} target="_blank" rel="noreferrer"><Chrome aria-hidden="true" size={19} />{content.installLabel}</a></footer>
    </main>
  );
}
