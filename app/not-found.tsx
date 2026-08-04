import Link from 'next/link';

// 404 页面：文章不存在或路径错误时展示
export default function NotFound() {
  return (
    <article>
      <h1>页面未找到</h1>
      <p>抱歉，你访问的页面不存在或已被移动。</p>
      <p>
        {/* 主要操作：返回首页 */}
        <Link href="/" className="button-primary">
          ← 返回首页
        </Link>
      </p>
    </article>
  );
}
