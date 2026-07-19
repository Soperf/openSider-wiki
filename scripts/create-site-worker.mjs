/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 * 为 Sites 托管补充静态资源 Worker 入口，并把站点根路径指向官网页面；不参与 Chrome 扩展运行。
 */
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir(new URL('../dist/server/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../dist/server/index.js', import.meta.url),
  `export default { async fetch(request, environment) { const url = new URL(request.url); if (url.pathname === '/') url.pathname = '/website.html'; return environment.ASSETS.fetch(new Request(url, request)); } };\n`,
);
