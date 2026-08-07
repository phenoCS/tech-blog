import Link from 'next/link';
import PostList from '@/components/PostList';
import { getAllPosts, getAllTags, getPostsByTag } from '@/lib/posts';

// 首页：支持 ?tag= 按标签筛选文章（服务端渲染）
export default function HomePage({
  searchParams,
}: {
  searchParams: { tag?: string | string[] };
}) {
  const rawTag = searchParams.tag;
  const activeTag = Array.isArray(rawTag)
    ? rawTag[0]
    : typeof rawTag === 'string'
      ? rawTag
      : undefined;

  const allTags = getAllTags();
  const posts = activeTag ? getPostsByTag(activeTag) : getAllPosts();

  return (
    <>
      <h1>文章</h1>

      {/* 标签筛选栏：列出全部标签及文章数，当前标签高亮 */}
      {allTags.length > 0 && (
        <nav className="tag-list" aria-label="标签筛选">
          <Link
            href="/"
            className={`tag${activeTag ? '' : ' is-active'}`}
          >
            全部
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag.name}
              href={`/?tag=${encodeURIComponent(tag.name)}`}
              className={`tag${activeTag === tag.name ? ' is-active' : ''}`}
            >
              {tag.name}
              <span className="tag-count">{tag.count}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* 筛选提示：列出当前标签与结果数量，并提供清除入口 */}
      {activeTag && (
        <p className="tag-filter-note">
          正在筛选标签「{activeTag}」，共 {posts.length} 篇。
          <Link href="/">清除筛选</Link>
        </p>
      )}

      <PostList posts={posts} />
    </>
  );
}
