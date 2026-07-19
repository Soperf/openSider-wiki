/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrivacyPolicyApp } from './PrivacyPolicyApp';
import './privacyPolicy.css';
import './websiteLocale.css';

createRoot(document.getElementById('root')!).render(<StrictMode><PrivacyPolicyApp /></StrictMode>);
