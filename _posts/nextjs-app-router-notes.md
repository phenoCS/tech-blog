---
title: "Next.js App Router 的几个关键概念"
date: "2026-07-28"
slug: "nextjs-app-router-notes"
---

App Router 与过去的 Pages Router 差异不小，下面是我在实践中最常用到的几个概念。

## 1. 目录即路由

`app/` 下的每个文件夹对应一段 URL，文件夹中的 `page.jsx` 才是可访问的页面。
动态段用方括号表示，例如 `app/posts/[slug]/page.jsx` 对应 `/posts/xxx`。

## 2. 默认是服务端组件

App Router 中的组件默认在服务端渲染，可以直接读文件、查数据库，
不需要 `getStaticProps` 这类数据获取函数：

```jsx
export default async function Page() {
  const posts = getAllPosts(); // 直接在组件里读本地 Markdown
  return <PostList posts={posts} />;
}
```

只有需要浏览器能力（状态、事件、浏览器 API）时，才在文件顶部加上 `'use client'`。

## 3. 布局会被复用

`layout.jsx` 在路由切换时不会卸载，适合放导航栏、页脚这类全局结构，
同时也是引入全局样式表的地方。

## 4. 静态化靠 generateStaticParams

对动态路由声明 `generateStaticParams`，构建时就会把每个 slug 预渲染成静态 HTML：

```js
export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}
```

对博客这类内容站点来说，这基本就是最优解。
