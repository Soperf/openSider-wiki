/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { describe, expect, it } from 'vitest';
import {
  CHROME_WEB_STORE_URL,
  DEFAULT_WEBSITE_LOCALE,
  getWebsiteAssetUrl,
  getStoredWebsiteLocale,
  saveWebsiteLocale,
  websiteFeatures,
  websiteContentByLocale,
  websiteNavigation,
  websiteTrustPoints,
  websiteUseCases,
} from './websiteContent';

describe('产品官网内容', () => {
  it('安装入口指向可替换的 Chrome Web Store 地址', () => {
    expect(CHROME_WEB_STORE_URL).toBe('https://chromewebstore.google.com/');
  });

  it('完整覆盖聊天、翻译、Agent 与 BYOK 四项能力', () => {
    expect(websiteFeatures.map((feature) => feature.id)).toEqual([
      'chat',
      'translate',
      'agent',
      'byok',
    ]);
    expect(
      websiteFeatures.every((feature) => feature.title && feature.description),
    ).toBe(true);
  });

  it('提供三段用户场景和三条本地可信承诺', () => {
    expect(websiteUseCases).toHaveLength(3);
    expect(websiteTrustPoints).toHaveLength(3);
  });

  it('导航锚点与官网主章节一一对应', () => {
    expect(websiteNavigation.map((item) => item.href)).toEqual([
      '#features',
      '#use-cases',
      '/privacy/',
    ]);
  });

  it('默认使用英文，并为两种语言提供完整官网内容', () => {
    expect(DEFAULT_WEBSITE_LOCALE).toBe('en');
    expect(websiteContentByLocale.en.navigation).toHaveLength(3);
    expect(websiteContentByLocale['zh-CN'].features).toHaveLength(4);
  });

  it('恢复合法的本地语言偏好，并对无效值回退英文', () => {
    const memoryStorage = createMemoryStorage();
    memoryStorage.setItem('opensider.website.locale', 'zh-CN');
    expect(getStoredWebsiteLocale(memoryStorage)).toBe('zh-CN');
    memoryStorage.setItem('opensider.website.locale', 'fr');
    expect(getStoredWebsiteLocale(memoryStorage)).toBe('en');
  });

  it('保存用户选择的语言', () => {
    const memoryStorage = createMemoryStorage();
    saveWebsiteLocale(memoryStorage, 'zh-CN');
    expect(memoryStorage.getItem('opensider.website.locale')).toBe('zh-CN');
  });

  it('在本地存储不可访问时回退英文且不抛错', () => {
    const unavailableStorage = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    };

    expect(getStoredWebsiteLocale(unavailableStorage)).toBe('en');
    expect(() => saveWebsiteLocale(unavailableStorage, 'zh-CN')).not.toThrow();
  });

  it('为没有结尾斜杠的站点基路径生成正确的静态资源地址', () => {
    expect(getWebsiteAssetUrl('/openSider-wiki', 'logo.png')).toBe('/openSider-wiki/logo.png');
  });
});

function createMemoryStorage(): {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
} {
  const valuesByKey = new Map<string, string>();

  return {
    getItem: (key) => valuesByKey.get(key) ?? null,
    setItem: (key, value) => valuesByKey.set(key, value),
  };
}
