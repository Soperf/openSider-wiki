# openSider 独立隐私政策页设计

## 背景

openSider 将发布至 Chrome Web Store。Chrome 要求处理用户数据的扩展提供准确、及时更新且可公开访问的隐私政策，并披露用户数据的收集、使用、共享方式及共享对象。

参考：

- [Chrome Web Store Privacy Policies](https://developer.chrome.com/docs/webstore/program-policies/privacy)
- [Chrome Web Store User Data Policy](https://developer.chrome.com/docs/webstore/user_data)
- [Sider.AI Privacy Policy](https://sider.ai/zh-CN/policies/privacy)（仅参考信息架构，不复制其业务条款）

## 目标

在现有 Vite + React 官网中提供一个不依赖第三方路由库、可从固定 URL 直接访问的中英双语隐私政策页。该页可作为 Chrome Web Store 开发者后台的隐私政策链接。

## 非目标

- 不改变扩展本身的数据处理行为。
- 不实现 Cookie 横幅、账号体系或服务端数据请求。
- 不对尚未确认的分析、广告、数据留存或第三方共享行为作声明。

## 方案与取舍

选择“独立静态入口 + 路径分发”方案：Vite 将构建 `privacy/index.html`，使 `/privacy/` 可由纯静态托管直接访问；`main.tsx` 仍根据 `window.location.pathname` 分发首页或隐私页，以便本地开发和支持 SPA 回退的环境保持一致。该方案复用既有 React、语言偏好和设计令牌，不引入路由依赖，并避免 Chrome Web Store 直接访问隐私链接时依赖服务器回退规则。

## 页面与组件边界

| 文件 | 职责 |
| --- | --- |
| `src/pages/website/PrivacyPolicyApp.tsx` | 渲染隐私政策页、语言切换和首页返回入口。 |
| `src/pages/website/privacyPolicyContent.ts` | 按语言定义政策正文、章节、联系邮箱与 Limited Use 声明。 |
| `src/pages/website/ProductWebsiteApp.tsx` | 将原本的隐私锚点导航改为 `/privacy`。 |
| `src/pages/website/main.tsx` | 根据路径选择首页或隐私政策页。 |
| `src/pages/website/privacyMain.tsx` | 独立静态入口，仅渲染隐私政策页。 |
| `privacy/index.html` | 生成 `/privacy/` 的静态 HTML 入口。 |
| `src/pages/website/privacyPolicy.css` | 独立页面的阅读版式与响应式样式。 |

## 数据披露范围

政策将准确说明以下已确认行为：

1. 用户主动发起 AI 功能时，选中文本、网页内容或输入的提示词会被发送给用户配置并选择的 AI 服务提供商，以生成所请求的结果。
2. 用户配置的 API Key 仅保存在其本地浏览器中；政策页不宣称已实现浏览器存储加密。
3. openSider 不运营用户账号系统、不出售用户数据，且不将该数据用于个性化广告。
4. 数据仅为用户可见功能所必需而处理；除用户选择的 AI 服务提供商、法律义务或安全需求外，不共享用户数据。
5. 用户可删除本地配置或联系 `soperfang@gmail.com` 提出隐私问题；第三方 AI 服务商的保留与处理规则受其自身政策约束。

政策还会加入 Chrome Web Store Limited Use 的肯定性声明，并说明这只适用于从 Google API 接收的信息（若扩展实际未使用 Google API，则不扩大其声明范围）。

## 交互与可访问性

- 默认语言为现有语言偏好或英文，并与首页共享 `opensider.website.locale` 存储键。
- 设置 `<html lang>`，为语言切换按钮提供 `aria-pressed`，所有链接保留可见键盘焦点。
- 章节使用语义化 `article`、`section`、`h1` 和 `h2`，以便 Chrome 审核人员和辅助技术浏览。
- 首页导航和页脚均链接 `/privacy`；隐私页提供回到首页的链接。

## 验收标准

1. 访问 `/privacy` 时显示完整的英文政策；切换中文后显示中文正文并保存语言偏好。
2. 政策包含更新时间、数据收集、用途、共享、存储与安全、用户选择、儿童隐私、更新、联系信息和 Limited Use 声明。
3. 政策展示 `soperfang@gmail.com`，并说明 API Key 仅保存在本地浏览器。
4. 首页的两处隐私入口均指向 `/privacy`，不再跳回首页锚点。
5. 单元测试覆盖路由分发、双语切换和必要披露文案；现有测试与生产构建通过。

## 风险与发布检查

隐私政策必须与扩展的实际权限、网络请求、Chrome Web Store “隐私权惯例”表单逐项一致。若扩展新增遥测、账号、云同步、网页抓取范围或第三方服务，必须同步更新本页与商店披露。此页面不构成法律意见；正式发布前应由发布负责人核对扩展实现和商店表单。
