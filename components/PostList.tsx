import type { PostMeta } from '@/lib/posts';
import PostListItem from './PostListItem';

// 文章列表：渲染所有文章卡片
export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostListItem post={post} />
        </li>
      ))}
    </ul>
  );
}
