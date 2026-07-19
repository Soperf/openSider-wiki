/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { describe, expect, it } from 'vitest';
import { getWebsitePage } from './websitePath';

describe('官网路径分发', () => {
  it('将隐私政策路径解析为独立隐私页', () => {
    expect(getWebsitePage('/privacy')).toBe('privacy');
    expect(getWebsitePage('/privacy/')).toBe('privacy');
  });

  it('将其他路径解析为官网首页', () => {
    expect(getWebsitePage('/')).toBe('home');
    expect(getWebsitePage('/not-found')).toBe('home');
  });
});
