/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
// @vitest-environment jsdom
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PrivacyPolicyApp } from './PrivacyPolicyApp';

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('PrivacyPolicyApp', () => {
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

  it('显示英文政策、联系邮箱和 Limited Use 声明，并支持切换中文', () => {
    act(() => root.render(<PrivacyPolicyApp />));

    expect(container.querySelector('h1')?.textContent).toContain('Privacy Policy');
    expect(container.textContent).toContain('soperfang@gmail.com');
    expect(container.textContent).toContain('Chrome Web Store User Data Policy');

    const chineseButton = container.querySelector<HTMLButtonElement>('button[aria-label="中文"]');
    act(() => chineseButton?.click());

    expect(container.querySelector('h1')?.textContent).toContain('隐私政策');
    expect(document.documentElement.lang).toBe('zh-CN');
  });
});
