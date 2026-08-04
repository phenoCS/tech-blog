import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import PostDate from './PostDate';

// 文章列表项：整体是一个卡片链接（标题 + 日期 + 摘要）
export default function PostListItem({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="post-list-item">
      {/* 发布日期（次要文字） */}
      <PostDate date={post.date} />
      {/* 文章标题 */}
      <h2 className="post-title">{post.title}</h2>
      {/* 摘要（前 50 字） */}
      <p className="post-excerpt">{post.excerpt}</p>
    </Link>
  );
}
