/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */

export type WebsitePage = 'home' | 'privacy';

export function getWebsitePage(pathname: string): WebsitePage {
  return pathname.replace(/\/+$/, '') === '/privacy' ? 'privacy' : 'home';
}
