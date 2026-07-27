/**
 * @author xiaopeng.fxp
 * @date 2026-07-27
 */
// @vitest-environment jsdom
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const HOMEPAGE_URL = 'https://soperf.github.io/openSider-wiki/';
const PRIVACY_POLICY_URL = `${HOMEPAGE_URL}privacy/`;
const BRAND_IMAGE_URL = `${HOMEPAGE_URL}logo.png`;
const CHROME_EXTENSION_URL = 'https://chromewebstore.google.com/detail/opensider/ofeelmcgallchedabmghibnmajbkjamo';
const SEO_TITLE = 'openSider – AI Browser Assistant & Web Agent for Chrome';
const SEO_DESCRIPTION = 'Chat with AI, translate webpages, and automate browser tasks with openSider. Bring your own API key, keep it stored locally, and install the Chrome extension for free.';
const homepageArtifactPath = resolve(process.cwd(), 'index.html');
const sitemapArtifactPath = resolve(process.cwd(), 'public/sitemap.xml');

function parseHtmlArtifact(artifactPath: string): Document {
  const artifactContent = readFileSync(artifactPath, 'utf8');
  return new DOMParser().parseFromString(artifactContent, 'text/html');
}

function getMetaContent(homepageDocument: Document, selector: string): string | null {
  return homepageDocument.querySelector<HTMLMetaElement>(selector)?.content ?? null;
}

describe('官网 SEO', () => {
  it('向搜索引擎提供唯一规范首页和可索引的产品摘要', () => {
    const homepageDocument = parseHtmlArtifact(homepageArtifactPath);

    expect(homepageDocument.documentElement.lang).toBe('en');
    expect(homepageDocument.title).toBe(SEO_TITLE);
    expect(getMetaContent(homepageDocument, 'meta[name="description"]')).toBe(SEO_DESCRIPTION);
    expect(getMetaContent(homepageDocument, 'meta[name="robots"]')).toBe('index, follow, max-image-preview:large');
    expect(getMetaContent(homepageDocument, 'meta[name="application-name"]')).toBe('openSider');
    expect(getMetaContent(homepageDocument, 'meta[name="theme-color"]')).toBe('#6846ff');
    expect(getMetaContent(homepageDocument, 'meta[name="google-site-verification"]')).toBe('d3BXPx15hSolJn9fmwl_2ziikudUxasjS4dn-Qqir0c');
    expect(homepageDocument.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(HOMEPAGE_URL);
    expect(homepageDocument.querySelector<HTMLLinkElement>('link[rel="icon"]')?.getAttribute('href')).toBe('%BASE_URL%logo.png');
  });

  it('为链接分享提供与规范首页一致的社交卡片', () => {
    const homepageDocument = parseHtmlArtifact(homepageArtifactPath);

    expect(getMetaContent(homepageDocument, 'meta[property="og:type"]')).toBe('website');
    expect(getMetaContent(homepageDocument, 'meta[property="og:site_name"]')).toBe('openSider');
    expect(getMetaContent(homepageDocument, 'meta[property="og:url"]')).toBe(HOMEPAGE_URL);
    expect(getMetaContent(homepageDocument, 'meta[property="og:title"]')).toBe(SEO_TITLE);
    expect(getMetaContent(homepageDocument, 'meta[property="og:description"]')).toBe(SEO_DESCRIPTION);
    expect(getMetaContent(homepageDocument, 'meta[property="og:locale"]')).toBe('en_US');
    expect(getMetaContent(homepageDocument, 'meta[property="og:locale:alternate"]')).toBe('zh_CN');
    expect(getMetaContent(homepageDocument, 'meta[property="og:image"]')).toBe(BRAND_IMAGE_URL);
    expect(getMetaContent(homepageDocument, 'meta[property="og:image:type"]')).toBe('image/png');
    expect(getMetaContent(homepageDocument, 'meta[property="og:image:width"]')).toBe('466');
    expect(getMetaContent(homepageDocument, 'meta[property="og:image:height"]')).toBe('466');
    expect(getMetaContent(homepageDocument, 'meta[property="og:image:alt"]')).toBe('openSider logo');
    expect(getMetaContent(homepageDocument, 'meta[name="twitter:card"]')).toBe('summary');
    expect(getMetaContent(homepageDocument, 'meta[name="twitter:title"]')).toBe(SEO_TITLE);
    expect(getMetaContent(homepageDocument, 'meta[name="twitter:description"]')).toBe(SEO_DESCRIPTION);
    expect(getMetaContent(homepageDocument, 'meta[name="twitter:image"]')).toBe(BRAND_IMAGE_URL);
    expect(getMetaContent(homepageDocument, 'meta[name="twitter:image:alt"]')).toBe('openSider logo');
  });

  it('通过结构化数据准确描述免费 Chrome 应用', () => {
    const homepageDocument = parseHtmlArtifact(homepageArtifactPath);
    const structuredDataContent = homepageDocument.querySelector<HTMLScriptElement>('script[type="application/ld+json"]')?.textContent ?? '{}';
    const structuredApplication = JSON.parse(structuredDataContent) as Record<string, unknown>;

    expect(structuredApplication).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'openSider',
      url: HOMEPAGE_URL,
      downloadUrl: CHROME_EXTENSION_URL,
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Google Chrome',
      description: SEO_DESCRIPTION,
      image: BRAND_IMAGE_URL,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    });
    expect(structuredApplication).not.toHaveProperty('aggregateRating');
  });

  it('通过站点地图暴露首页和隐私政策页', () => {
    expect(existsSync(sitemapArtifactPath)).toBe(true);
    if (!existsSync(sitemapArtifactPath)) {
      return;
    }

    const sitemapDocument = parseHtmlArtifact(sitemapArtifactPath);
    const indexedUrls = [...sitemapDocument.querySelectorAll('loc')]
      .map((locationElement) => locationElement.textContent?.trim());

    expect(indexedUrls).toEqual([HOMEPAGE_URL, PRIVACY_POLICY_URL]);
  });
});
