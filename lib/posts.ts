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
  tags: string[];
}

// 单篇文章（含渲染后的 HTML 正文）
export interface Post extends PostMeta {
  contentHtml: string;
}

// 标签聚合信息（名称 + 出现次数），用于首页筛选栏
export interface TagInfo {
  name: string;
  count: number;
}

// 读取目录下所有 .md 文件名
function getPostFiles(): string[] {
  return fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'));
}

// 从 front matter 解析标签：支持数组（["a","b"]）或逗号分隔字符串（"a, b"）
function parseTags(data: Record<string, unknown>): string[] {
  const raw = data.tags;
  if (Array.isArray(raw)) {
    return raw.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
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
        tags: parseTags(data),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 获取所有标签及其出现次数，按次数倒序、同名按中文排序
export function getAllTags(): TagInfo[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh'));
}

// 根据标签筛选文章（按日期倒序）
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
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
    tags: parseTags(data),
    contentHtml,
  };
}
