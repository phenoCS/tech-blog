import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// Markdown 文章目录
const POSTS_DIR = path.join(process.cwd(), '_posts');

// 文章元信息（用于列表展示）
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

// 单篇文章（含渲染后的 HTML 正文）
export interface Post extends PostMeta {
  contentHtml: string;
}

// 读取目录下所有 .md 文件名
function getPostFiles(): string[] {
  return fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'));
}

// 从 Markdown 正文生成前 50 字摘要（去掉代码块与标记符号）
function buildExcerpt(content: string): string {
  const text = content
    .replace(/```[\s\S]*?```/g, '') // 去掉代码块
    .replace(/[#>*_`~\-]/g, '') // 去掉常见 Markdown 符号
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 50 ? `${text.slice(0, 50)}…` : text;
}

// 使用 remark/rehype 链把 Markdown 渲染为 HTML（异步）
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm) // 支持 GFM（表格、删除线、任务列表等）
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

// 获取所有文章元信息，按发布日期倒序排列（用于首页列表）
export function getAllPosts(): PostMeta[] {
  return getPostFiles()
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? '',
        excerpt: buildExcerpt(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 根据 slug 获取单篇文章（含渲染后的 HTML 正文）
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const contentHtml = await renderMarkdown(content);

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? '',
    excerpt: buildExcerpt(content),
    contentHtml,
  };
}
