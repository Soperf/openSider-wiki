/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 * 产品官网的双语文案与语言偏好。
 */

export const CHROME_WEB_STORE_URL = 'https://chromewebstore.google.com/';
export const WEBSITE_LOCALE_STORAGE_KEY = 'opensider.website.locale';

export type WebsiteLocale = 'en' | 'zh-CN';
export const DEFAULT_WEBSITE_LOCALE: WebsiteLocale = 'en';

export interface WebsiteStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

export interface WebsiteNavigationItem {
  label: string;
  href: '#features' | '#use-cases' | '/privacy';
}

export interface WebsiteFeature {
  id: 'chat' | 'translate' | 'agent' | 'byok';
  eyebrow: string;
  title: string;
  description: string;
  accentClassName: string;
}

export interface WebsiteUseCase {
  step: string;
  title: string;
  description: string;
  prompt: string;
}

export interface WebsiteContent {
  navigation: readonly WebsiteNavigationItem[];
  installLabel: string;
  menuLabel: string;
  localeToggleLabel: string;
  hero: {
    kicker: string;
    title: readonly [string, string];
    description: string;
    exploreLabel: string;
    note: string;
    visualQuestion: string;
    visualPrompt: string;
    visualAnswer: string;
    visualTranslation: string;
  };
  featuresLabel: string;
  featuresTitle: readonly [string, string];
  features: readonly WebsiteFeature[];
  useCasesLabel: string;
  useCasesTitle: readonly [string, string];
  useCases: readonly WebsiteUseCase[];
  privacyLabel: string;
  privacyTitle: readonly [string, string];
  trustPoints: readonly string[];
  footerDescription: string;
  privacyLinkLabel: string;
}

export const websiteContentByLocale: Readonly<Record<WebsiteLocale, WebsiteContent>> = {
  en: {
    navigation: [
      { label: 'Features', href: '#features' },
      { label: 'Use cases', href: '#use-cases' },
      { label: 'Privacy', href: '/privacy' },
    ],
    installLabel: 'Install for free',
    menuLabel: 'Open navigation menu',
    localeToggleLabel: 'Choose language',
    hero: {
      kicker: 'Your browser finally has a sidekick',
      title: ['Open your browser,', 'with AI on your side.'],
      description: 'Chat, translate, and take care of web tasks without looking away. openSider puts helpful AI in the browser you use every day.',
      exploreLabel: 'See what it can do ↓',
      note: 'For Chrome · Free to install · Your key stays local',
      visualQuestion: 'What would you like to work on today?',
      visualPrompt: 'Summarize this page for me',
      visualAnswer: 'Absolutely. Let me handle the hard part.',
      visualTranslation: 'Translate the page without leaving it',
    },
    featuresLabel: 'Your entire browser, made smarter',
    featuresTitle: ['Useful doesn’t have to', 'be so serious.'],
    features: [
      { id: 'chat', eyebrow: 'Chat anytime', title: 'An idea? Ask right away.', description: 'Keep AI at the side of your browser and ask as you read.', accentClassName: 'feature-card--violet' },
      { id: 'translate', eyebrow: 'Immersive translation', title: 'Read foreign pages in context.', description: 'Keep the page structure intact, so you never need to jump between tabs to understand it.', accentClassName: 'feature-card--mint' },
      { id: 'agent', eyebrow: 'Browser Agent', title: 'Let web tasks keep moving.', description: 'Gather information across tabs and help with repetitive browser work.', accentClassName: 'feature-card--coral' },
      { id: 'byok', eyebrow: 'BYOK', title: 'Your key stays in your browser.', description: 'Choose the model provider you know. Your API key is stored locally only.', accentClassName: 'feature-card--sky' },
    ],
    useCasesLabel: 'Move at your own pace',
    useCasesTitle: ['Switch less,', 'finish more.'],
    useCases: [
      { step: '01', title: 'Research with fewer tabs.', description: 'Open the side panel when a question comes up and turn scattered information into a next step.', prompt: 'Turn this article into 3 actionable recommendations' },
      { step: '02', title: 'Read foreign pages without interruption.', description: 'Translation stays on the original page, along with its headings, paragraphs, and context.', prompt: 'Keep the terminology and translate this naturally' },
      { step: '03', title: 'Get work done across tabs with less repetition.', description: 'Let Agent connect collection, comparison, and browser actions for you.', prompt: 'Compare these pages and tell me the differences that matter most' },
    ],
    privacyLabel: 'Use it comfortably. Use it confidently.',
    privacyTitle: ['The AI is yours.', 'So is the control.'],
    trustPoints: ['Your API key stays in your local browser', 'Choose the model provider that suits you', 'Configure it and get started after installation'],
    footerDescription: 'A fun, reliable AI sidekick for your browser.',
    privacyLinkLabel: 'Privacy policy',
  },
  'zh-CN': {
    navigation: [
      { label: '能力', href: '#features' },
      { label: '场景', href: '#use-cases' },
      { label: '隐私', href: '/privacy' },
    ],
    installLabel: '免费安装',
    menuLabel: '打开导航菜单',
    localeToggleLabel: '选择语言',
    hero: {
      kicker: '你的浏览器，终于有了搭子',
      title: ['打开浏览器，', '让 AI 站在你这边。'],
      description: '聊天、翻译、网页任务，一抬眼就在身边。openSider 把好用的 AI 放进你每天都在用的浏览器。',
      exploreLabel: '看看它能做什么 ↓',
      note: '适用于 Chrome · 安装免费 · 你的密钥只留在本地',
      visualQuestion: '今天想一起做点什么？',
      visualPrompt: '帮我总结这个页面的重点',
      visualAnswer: '当然，把难的交给我。',
      visualTranslation: '翻译原网页，不用跳走',
    },
    featuresLabel: '一整个浏览器，都更聪明',
    featuresTitle: ['好用这件事，', '可以不用那么严肃。'],
    features: [
      { id: 'chat', eyebrow: '随时聊天', title: '灵感出现，马上问。', description: '把 AI 放在浏览器侧边，读到哪里问到哪里。', accentClassName: 'feature-card--violet' },
      { id: 'translate', eyebrow: '沉浸翻译', title: '外语页面，也能顺着读。', description: '保留原网页结构，让理解不必在标签页间跳来跳去。', accentClassName: 'feature-card--mint' },
      { id: 'agent', eyebrow: '浏览器 Agent', title: '让网页任务自己往前走。', description: '跨标签页整理信息，协助完成浏览器中的重复操作。', accentClassName: 'feature-card--coral' },
      { id: 'byok', eyebrow: 'BYOK', title: '你的密钥，留在你的浏览器。', description: '选择熟悉的模型提供商，API Key 仅保存在本地。', accentClassName: 'feature-card--sky' },
    ],
    useCasesLabel: '跟着你的节奏来',
    useCasesTitle: ['少一点切换，', '多一点真的完成。'],
    useCases: [
      { step: '01', title: '查资料，少开几个标签页。', description: '看到问题就呼出侧边栏，把零散信息收束成下一步。', prompt: '把这篇文章整理成 3 个行动建议' },
      { step: '02', title: '读外语网页，不打断阅读。', description: '翻译留在原页面里，标题、段落和语境都还在。', prompt: '保留术语，把这一段翻成自然中文' },
      { step: '03', title: '跨标签完成任务，少一点重复。', description: '让 Agent 帮你串起收集、比较与网页操作的步骤。', prompt: '比较这些页面，并告诉我最值得关注的差别' },
    ],
    privacyLabel: '舒服地用，安心地用',
    privacyTitle: ['AI 是你的。', '掌控感也是。'],
    trustPoints: ['API Key 仅保存在本地浏览器', '按你的习惯选择模型提供商', '安装后即可开始配置和使用'],
    footerDescription: '给浏览器装上一个有趣、靠谱的 AI 搭子。',
    privacyLinkLabel: '隐私政策',
  },
};

export function getStoredWebsiteLocale(storage: WebsiteStorage | null): WebsiteLocale {
  try {
    const storedLocale = storage?.getItem(WEBSITE_LOCALE_STORAGE_KEY);
    return storedLocale === 'en' || storedLocale === 'zh-CN' ? storedLocale : DEFAULT_WEBSITE_LOCALE;
  } catch {
    return DEFAULT_WEBSITE_LOCALE;
  }
}

export function saveWebsiteLocale(storage: WebsiteStorage | null, locale: WebsiteLocale): void {
  try {
    storage?.setItem(WEBSITE_LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage access is optional; the in-memory UI state remains usable.
  }
}

export function getWebsiteBrowserStorage(): WebsiteStorage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function getWebsiteAssetUrl(basePath: string, assetPath: string): string {
  return `${basePath.replace(/\/$/, '')}/${assetPath}`;
}

export const websiteNavigation = websiteContentByLocale['zh-CN'].navigation;
export const websiteFeatures = websiteContentByLocale['zh-CN'].features;
export const websiteUseCases = websiteContentByLocale['zh-CN'].useCases;
export const websiteTrustPoints = websiteContentByLocale['zh-CN'].trustPoints;
