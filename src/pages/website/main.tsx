/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrivacyPolicyApp } from './PrivacyPolicyApp';
import { ProductWebsiteApp } from './ProductWebsiteApp';
import './productWebsite.css';
import './privacyPolicy.css';
import './websiteLocale.css';
import { getWebsitePage } from './websitePath';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const pathname = window.location.pathname.startsWith(basePath)
  ? window.location.pathname.slice(basePath.length) || '/'
  : window.location.pathname;
const WebsiteApp = getWebsitePage(pathname) === 'privacy' ? PrivacyPolicyApp : ProductWebsiteApp;

createRoot(document.getElementById('root')!).render(<StrictMode><WebsiteApp /></StrictMode>);
