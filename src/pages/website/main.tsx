/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProductWebsiteApp } from './ProductWebsiteApp';
import './productWebsite.css';
import './websiteLocale.css';

createRoot(document.getElementById('root')!).render(<StrictMode><ProductWebsiteApp /></StrictMode>);
