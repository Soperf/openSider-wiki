# 官网中英文本地化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让官网首次访问显示英文，并提供可持久化的英文和简体中文切换。

**Architecture:** 在 `websiteContent.ts` 中定义受限语言类型、双语内容和安全的语言偏好读写函数。`ProductWebsiteApp` 负责持有当前语言、同步根元素语言属性并将本地化内容传给所有页面区块；不引入额外国际化依赖。

**Tech Stack:** React 18、TypeScript、Vite、Vitest、浏览器 `localStorage`。

## Global Constraints

- 仅支持 `en` 与 `zh-CN`，首次访问默认 `en`。
- 用户显式选择语言后必须保存到浏览器本地；无效存储值必须回退英文。
- 不修改浏览器扩展的既有国际化功能，也不增加第三方依赖。
- 新增源文件必须带 `@author xiaopeng.fxp` 与 `@date` 文件头。

---

### Task 1: 建立可测试的双语内容与偏好边界

**Files:**
- Modify: `src/pages/website/websiteContent.ts`
- Modify: `src/pages/website/websiteContent.test.ts`

**Interfaces:**
- Produces: `WebsiteLocale = 'en' | 'zh-CN'`、`DEFAULT_WEBSITE_LOCALE`、`websiteContentByLocale`、`getStoredWebsiteLocale(storage)`、`saveWebsiteLocale(storage, locale)`。
- Consumes: 可选的浏览器 `Storage` 接口；测试中使用同形状的内存存储替身。

- [ ] **Step 1: 写入失败测试，规定英文默认值、双语内容及存储回退行为**

```ts
import {
  DEFAULT_WEBSITE_LOCALE,
  getStoredWebsiteLocale,
  saveWebsiteLocale,
  websiteContentByLocale,
} from './websiteContent';

it('默认使用英文，并为两种语言提供完整官网内容', () => {
  expect(DEFAULT_WEBSITE_LOCALE).toBe('en');
  expect(websiteContentByLocale.en.navigation).toHaveLength(3);
  expect(websiteContentByLocale['zh-CN'].features).toHaveLength(4);
});

it('恢复合法的本地语言偏好，并对无效值回退英文', () => {
  localStorage.setItem('opensider.website.locale', 'zh-CN');
  expect(getStoredWebsiteLocale(localStorage)).toBe('zh-CN');
  localStorage.setItem('opensider.website.locale', 'fr');
  expect(getStoredWebsiteLocale(localStorage)).toBe('en');
});

it('保存用户选择的语言', () => {
  const storage = createMemoryStorage();
  saveWebsiteLocale(storage, 'zh-CN');
  expect(storage.getItem('opensider.website.locale')).toBe('zh-CN');
});

it('在本地存储不可访问时回退英文且不抛错', () => {
  const unavailableStorage = {
    getItem: () => { throw new Error('blocked'); },
    setItem: () => { throw new Error('blocked'); },
  };
  expect(getStoredWebsiteLocale(unavailableStorage)).toBe('en');
  expect(() => saveWebsiteLocale(unavailableStorage, 'zh-CN')).not.toThrow();
});
```

- [ ] **Step 2: 运行测试，确认其因导出尚不存在而失败**

Run: `npx vitest run src/pages/website/websiteContent.test.ts`

Expected: FAIL，提示 `DEFAULT_WEBSITE_LOCALE` 等导出不存在。

- [ ] **Step 3: 最小实现双语内容和语言偏好函数**

```ts
export type WebsiteLocale = 'en' | 'zh-CN';
export const DEFAULT_WEBSITE_LOCALE: WebsiteLocale = 'en';
export const WEBSITE_LOCALE_STORAGE_KEY = 'opensider.website.locale';

export function getStoredWebsiteLocale(storage: Storage | null): WebsiteLocale {
  try {
    const locale = storage?.getItem(WEBSITE_LOCALE_STORAGE_KEY);
    return locale === 'zh-CN' || locale === 'en' ? locale : DEFAULT_WEBSITE_LOCALE;
  } catch {
    return DEFAULT_WEBSITE_LOCALE;
  }
}

export function saveWebsiteLocale(storage: Storage | null, locale: WebsiteLocale): void {
  try {
    storage?.setItem(WEBSITE_LOCALE_STORAGE_KEY, locale);
  } catch {
    // 页面仍可在当前会话切换语言。
  }
}
```

为 `en` 和 `zh-CN` 提供同结构的导航、英雄区、功能、场景、信任点和页脚内容，页面链接保持既有锚点。

- [ ] **Step 4: 运行内容测试，确认通过**

Run: `npx vitest run src/pages/website/websiteContent.test.ts`

Expected: PASS，所有官网内容与存储偏好测试通过。

- [ ] **Step 5: 提交该独立可测试单元**

```bash
git add src/pages/website/websiteContent.ts src/pages/website/websiteContent.test.ts
git commit -m "feat: add localized website content"
```

### Task 2: 将语言状态接入官网界面

**Files:**
- Modify: `src/pages/website/ProductWebsiteApp.tsx`
- Modify: `src/pages/website/productWebsite.css`

**Interfaces:**
- Consumes: Task 1 的 `WebsiteLocale`、`getStoredWebsiteLocale`、`saveWebsiteLocale` 与 `websiteContentByLocale`。
- Produces: 页头语言切换控件；切换时更新页面内容、`localStorage` 与 `document.documentElement.lang`。

- [ ] **Step 1: 写入失败的组件行为测试**

```ts
it('首次渲染显示英文，切换中文后保存偏好并更新文档语言', async () => {
  render(<ProductWebsiteApp />);
  expect(screen.getByRole('heading', { name: /your browser/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: '中文' }));
  expect(screen.getByRole('heading', { name: /打开浏览器/i })).toBeInTheDocument();
  expect(localStorage.getItem('opensider.website.locale')).toBe('zh-CN');
  expect(document.documentElement.lang).toBe('zh-CN');
});
```

若项目尚未配置 React Testing Library，则以 `websiteContent.test.ts` 的纯函数测试覆盖语言状态，并在浏览器中手动验证组件行为；不为单一官网页面引入新的测试依赖。

- [ ] **Step 2: 运行测试，确认当前页面尚无语言切换而失败**

Run: `npx vitest run src/pages/website/websiteContent.test.ts`

Expected: 语言状态的新增断言失败，或组件测试因切换按钮不存在而失败。

- [ ] **Step 3: 最小实现状态、语言同步和切换控件**

```tsx
const [locale, setLocale] = useState(() => getStoredWebsiteLocale(window.localStorage));
const content = websiteContentByLocale[locale];

useEffect(() => {
  document.documentElement.lang = locale;
}, [locale]);

function handleLocaleChange(nextLocale: WebsiteLocale): void {
  setLocale(nextLocale);
  saveWebsiteLocale(window.localStorage, nextLocale);
}
```

使用两个语义化按钮 `EN` 与 `中文`，当前项用 `aria-pressed` 标识；替换组件中全部中文硬编码文案为 `content` 中的对应字段。为桌面端与移动端切换控件添加紧凑、可见焦点状态的样式。

- [ ] **Step 4: 运行测试，确认通过**

Run: `npx vitest run src/pages/website/websiteContent.test.ts`

Expected: PASS，语言默认、恢复、保存及双语内容测试通过。

- [ ] **Step 5: 提交界面接入单元**

```bash
git add src/pages/website/ProductWebsiteApp.tsx src/pages/website/productWebsite.css
git commit -m "feat: add website language switcher"
```

### Task 3: 全量验证与交付检查

**Files:**
- Modify: `docs/superpowers/specs/2026-07-19-website-localization-design.md`（仅在实现与设计不一致时更新）

**Interfaces:**
- Consumes: Task 1 与 Task 2 的成品。
- Produces: 已验证的中英文官网构建产物。

- [ ] **Step 1: 运行完整单元测试**

Run: `npm test`

Expected: PASS，零失败。

- [ ] **Step 2: 运行类型检查和生产构建**

Run: `npm run build`

Expected: exit code 0，生成 `dist/` 站点与 worker。

- [ ] **Step 3: 手动验收语言行为**

在浏览器访问官网：首次清除 `opensider.website.locale` 后验证英文；点选 `中文` 后刷新，验证中文仍被恢复；点选 `EN` 后刷新，验证英文恢复。确认语言切换在窄屏布局中仍可点击、焦点可见。

- [ ] **Step 4: 提交计划与设计文档（如尚未提交）**

```bash
git add docs/superpowers/specs/2026-07-19-website-localization-design.md docs/superpowers/plans/2026-07-19-website-localization.md
git commit -m "docs: add website localization design"
```
