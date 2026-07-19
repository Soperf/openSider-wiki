# openSider 独立隐私政策页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 openSider 官网新增 `/privacy` 独立、双语且符合 Chrome Web Store 披露要求的隐私政策页面。

**Architecture:** Vite 以 `privacy/index.html` 产出 `/privacy/` 静态入口，并在首页入口中保留 `window.location.pathname` 分发，以支持本地开发和 SPA 回退。政策文案置于独立内容模块，复用既有语言偏好；首页所有隐私入口均指向 `/privacy/`。

**Tech Stack:** React 19、TypeScript、Vite、Vitest、Lucide React、原生 CSS。

## Global Constraints

- 政策必须准确披露数据的收集、使用、共享及共享对象，并与扩展实际行为和 Chrome Web Store 表单保持一致。
- 默认语言为英文，继续使用 `opensider.website.locale` 保存 `en` 或 `zh-CN`。
- API Key 仅声明保存于本地浏览器，不虚构未确认的加密或保留机制。
- 联系邮箱固定为 `soperfang@gmail.com`；不增加第三方运行时依赖。
- 新增 TypeScript 源文件必须带 `@author xiaopeng.fxp` 和 `@date 2026-07-19`。

---

### Task 1: 建立可测试的站点路径分发

**Files:**
- Create: `src/pages/website/websitePath.ts`
- Create: `src/pages/website/websitePath.test.ts`
- Modify: `src/pages/website/main.tsx`

**Interfaces:** 产生 `getWebsitePage(pathname: string): 'home' | 'privacy'`，`/privacy` 与 `/privacy/` 返回 `privacy`，其他路径返回 `home`。

- [ ] **Step 1: Write the failing test**

```typescript
expect(getWebsitePage('/privacy')).toBe('privacy');
expect(getWebsitePage('/privacy/')).toBe('privacy');
expect(getWebsitePage('/not-found')).toBe('home');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/website/websitePath.test.ts`
Expected: FAIL，无法解析 `./websitePath`。

- [ ] **Step 3: Write minimal implementation**

```typescript
export function getWebsitePage(pathname: string): 'home' | 'privacy' {
  return pathname.replace(/\/+$/, '') === '/privacy' ? 'privacy' : 'home';
}
```

在 `main.tsx` 中按该函数选择 `PrivacyPolicyApp` 或 `ProductWebsiteApp`。

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/website/websitePath.test.ts`
Expected: PASS，路径分发用例均通过。

- [ ] **Step 5: Commit**

Run: `git add src/pages/website/websitePath.ts src/pages/website/websitePath.test.ts src/pages/website/main.tsx && git commit -m "feat: route privacy policy page"`

### Task 2: 定义可审计的双语政策文案

**Files:**
- Create: `src/pages/website/privacyPolicyContent.ts`
- Create: `src/pages/website/privacyPolicyContent.test.ts`

**Interfaces:** 消费 `WebsiteLocale`，产生 `privacyPolicyContentByLocale: Readonly<Record<WebsiteLocale, PrivacyPolicyContent>>`；内容包含标题、更新时间、联系邮箱、Limited Use 声明与章节数组。

- [ ] **Step 1: Write the failing test**

```typescript
for (const content of Object.values(privacyPolicyContentByLocale)) {
  expect(content.contactEmail).toBe('soperfang@gmail.com');
  expect(content.limitedUseStatement).toContain('Chrome Web Store User Data Policy');
  expect(content.sections).toHaveLength(9);
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/website/privacyPolicyContent.test.ts`
Expected: FAIL，无法解析 `./privacyPolicyContent`。

- [ ] **Step 3: Write minimal implementation**

两种语言均提供九个章节：范围、处理的数据、使用目的、第三方共享、本地存储与安全、用户选择、儿童隐私、政策更新、联系我们。文案必须准确包含“请求内容发送给用户选择的 AI 服务商”“API Key 仅保存在本地浏览器”“不出售用户数据且不用于个性化广告”。

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/website/privacyPolicyContent.test.ts`
Expected: PASS，内容完整性用例通过。

- [ ] **Step 5: Commit**

Run: `git add src/pages/website/privacyPolicyContent.ts src/pages/website/privacyPolicyContent.test.ts && git commit -m "feat: add bilingual privacy policy content"`

### Task 3: 实现独立隐私页面和样式

**Files:**
- Create: `src/pages/website/PrivacyPolicyApp.tsx`
- Create: `src/pages/website/PrivacyPolicyApp.test.tsx`
- Create: `src/pages/website/privacyPolicy.css`

**Interfaces:** 消费政策内容和既有语言/资源辅助函数，产生 `PrivacyPolicyApp`；页面为 `/privacy` 提供语义化双语 UI。

- [ ] **Step 1: Write the failing test**

```tsx
act(() => root.render(<PrivacyPolicyApp />));
expect(container.querySelector('h1')?.textContent).toContain('Privacy Policy');
expect(container.textContent).toContain('soperfang@gmail.com');
expect(container.textContent).toContain('Chrome Web Store User Data Policy');
act(() => container.querySelector<HTMLButtonElement>('button[aria-label="中文"]')?.click());
expect(container.querySelector('h1')?.textContent).toContain('隐私政策');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/website/PrivacyPolicyApp.test.tsx`
Expected: FAIL，无法解析 `./PrivacyPolicyApp`。

- [ ] **Step 3: Write minimal implementation**

使用 `main`、`header`、`article`、`section`、`footer` 结构，顶部提供品牌、首页链接和语言切换；正文渲染更新时间、政策章节、Limited Use 声明及可点击邮箱。新增 CSS 延续现有奶油色、紫色强调、阅读宽度与 760px 响应式断点，并为链接和按钮提供 `:focus-visible`。

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/website/PrivacyPolicyApp.test.tsx`
Expected: PASS，页面行为用例通过。

- [ ] **Step 5: Commit**

Run: `git add src/pages/website/PrivacyPolicyApp.tsx src/pages/website/PrivacyPolicyApp.test.tsx src/pages/website/privacyPolicy.css && git commit -m "feat: add standalone privacy policy page"`

### Task 4: 更新首页入口并回归验证

**Files:**
- Modify: `src/pages/website/websiteContent.ts`
- Modify: `src/pages/website/ProductWebsiteApp.test.tsx`
- Modify: `src/pages/website/websiteContent.test.ts`

**Interfaces:** 将 `WebsiteNavigationItem.href` 支持 `/privacy`，首页导航和页脚产生稳定的隐私政策链接。

- [ ] **Step 1: Write the failing test**

```tsx
const privacyLink = [...container.querySelectorAll('a')]
  .find((link) => link.textContent === 'Privacy');
expect(privacyLink?.getAttribute('href')).toBe('/privacy');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/website/ProductWebsiteApp.test.tsx src/pages/website/websiteContent.test.ts`
Expected: FAIL，当前隐私链接仍是 `#privacy`。

- [ ] **Step 3: Write minimal implementation**

将导航的隐私项改为 `/privacy`；给两种语言新增 `privacyLinkLabel`；页脚新增政策链接，但保留首页既有可信承诺章节。

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run && npm run build`
Expected: 全部 Vitest 用例通过，Vite 构建以退出码 0 完成。

- [ ] **Step 5: Commit**

Run: `git add src/pages/website/websiteContent.ts src/pages/website/ProductWebsiteApp.test.tsx src/pages/website/websiteContent.test.ts && git commit -m "feat: link homepage to privacy policy"`
