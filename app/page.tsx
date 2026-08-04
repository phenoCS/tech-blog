import PostList from '@/components/PostList';
import { getAllPosts } from '@/lib/posts';

// 首页：展示所有文章列表（按日期倒序）
export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <h1>文章</h1>
      <PostList posts={posts} />
    </>
  );
}
