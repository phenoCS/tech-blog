# 个人技术博客（Anthropic 设计风格）

一个使用 **Next.js（App Router）+ React + TypeScript + Tailwind CSS** 构建的个人技术博客，
直接采用 **Anthropic 暖色调设计风格**：衬线正文、Clay 强调色、24px 卡片圆角、仅底部圆角的按钮，
无阴影、无渐变、无冷色。

## 技术栈

- **框架**：Next.js 14（App Router）
- **语言**：TypeScript
- **样式**：Tailwind CSS（设计令牌）+ `styles/globals.css` 中的 CSS 变量
- **内容**：本地 Markdown 文件（`_posts/` 目录）
- **Markdown 渲染**：`remark` + `remark-gfm` + `remark-rehype` + `rehype-stringify`
- **字体**：正文/标题衬线（Georgia 优先，含中文衬线后备）；UI 无衬线（Inter）；代码等宽（JetBrains Mono）

## 目录结构

```
_posts/                  示例 Markdown 文章（front matter: title / date / slug）
app/
  layout.tsx             根布局：固定导航栏 + 居中主体 + 深色页脚 + 字体引入
  globals.css            全站唯一样式来源（CSS 变量设计令牌）
  page.tsx               首页：文章列表（日期倒序）
  about/page.tsx         关于我（占位内容）
  posts/[slug]/page.tsx  文章详情页（静态生成）
  not-found.tsx          404 页面
components/              SiteHeader / SiteFooter / PostList / PostListItem / PostDate / MarkdownContent
lib/
  posts.ts               读取/解析/排序/摘要/Markdown 渲染
  date.ts                日期格式化
  site-config.ts         站点标题、导航、页脚文案
styles/globals.css       全局样式与设计令牌
tailwind.config.ts       Tailwind 设计令牌（颜色/字体/圆角/页宽），并从工具层禁用阴影与渐变
```

## 本地运行

```bash
# 1. 安装依赖
npm install

# 2. 开发模式（默认 http://localhost:3000）
npm run dev

# 3. 生产构建
npm run build

# 4. 运行生产版本
npm start
```

## 设计规范速览

| 类别 | 取值 |
|------|------|
| 页面背景 | `#f0eee6` |
| 卡片背景 | `#faf9f5` |
| 特色卡片 | `#f5e3c7` |
| 主文字 | `#141413` |
| 次要文字 | `#b0aea5` |
| 边框 | `#cccbc8` |
| 强调色 Clay | `#d97757`（悬停 `#c6613f`） |
| 页脚 | 背景 `#141413` / 文字 `#faf9f5` |
| 正文 | 衬线，20px / 行高 1.4 |
| 标题 | 衬线，H1 48 / H2 32 / H3 24 |
| 页面宽度 | 最大 1280px 居中 |
| 卡片圆角 | 24px |
| 按钮圆角 | 仅底部 8px（顶部直角） |

所有设计令牌集中在 `tailwind.config.ts` 与 `styles/globals.css` 的 `:root` 变量中，
后续换肤只需修改这两个文件，组件 JSX 无需改动。

## 添加新文章

在 `_posts/` 目录下新建 `.md` 文件，包含 front matter 与正文：

```markdown
---
title: "文章标题"
date: "2026-08-04"
slug: "my-post"
---

正文内容，支持标题、列表、代码块、表格、链接等 Markdown 语法。
```

> 注：`slug` 决定访问路径（`/posts/my-post`），文件名需与 slug 一致。
