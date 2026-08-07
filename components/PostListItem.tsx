import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import PostDate from './PostDate';

// 文章列表项：卡片内标题与标签各自为独立链接（避免嵌套 <a>）
export default function PostListItem({ post }: { post: PostMeta }) {
  return (
    <article className="post-list-item">
      {/* 发布日期（次要文字） */}
      <PostDate date={post.date} />
      {/* 文章标题（链接到详情页） */}
      <h2 className="post-title">
        <Link href={`/posts/${post.slug}`} className="post-title-link">
          {post.title}
        </Link>
      </h2>
      {/* 摘要（前 50 字） */}
      <p className="post-excerpt">{post.excerpt}</p>
      {/* 标签：点击跳转到首页按该标签筛选 */}
      {post.tags.length > 0 && (
        <ul className="post-tags">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link href={`/?tag=${encodeURIComponent(tag)}`} className="tag">
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
