/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
// @vitest-environment jsdom
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ProductWebsiteApp } from './ProductWebsiteApp';
import { WEBSITE_LOCALE_STORAGE_KEY } from './websiteContent';

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('ProductWebsiteApp', () => {
  let root: Root;
  let container: HTMLDivElement;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('首次显示英文，切换中文后保存偏好并更新文档语言', () => {
    act(() => root.render(<ProductWebsiteApp />));

    expect(container.querySelector('h1')?.textContent).toContain('Open your browser');
    expect(document.documentElement.lang).toBe('en');

    const chineseButton = container.querySelector<HTMLButtonElement>('button[aria-label="中文"]');
    expect(chineseButton).not.toBeNull();
    act(() => chineseButton?.click());

    expect(container.querySelector('h1')?.textContent).toContain('打开浏览器');
    expect(localStorage.getItem(WEBSITE_LOCALE_STORAGE_KEY)).toBe('zh-CN');
    expect(document.documentElement.lang).toBe('zh-CN');
  });
});
