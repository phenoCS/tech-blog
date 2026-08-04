import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { formatDate } from '@/lib/date';
import MarkdownContent from '@/components/MarkdownContent';

// 静态生成所有文章的路由
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// 为每篇文章动态生成 <title> / 描述
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: '文章未找到' };
  return { title: post.title, description: post.excerpt };
}

// 文章详情页：根据 slug 读取 Markdown 并渲染
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  // 文章不存在时返回 404
  if (!post) notFound();

  return (
    <article>
      {/* 文章标题与发布日期 */}
      <header className="post-header">
        <h1>{post.title}</h1>
        <p className="post-date">{formatDate(post.date)}</p>
      </header>

      {/* 正文（已渲染的 Markdown HTML） */}
      <MarkdownContent html={post.contentHtml} />

      {/* 主要操作：返回首页（Clay 按钮，仅底部圆角） */}
      <p style={{ marginTop: '32px' }}>
        <Link href="/" className="button-primary">
          ← 返回首页
        </Link>
      </p>
    </article>
  );
}
