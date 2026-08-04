import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

// 站点头部：固定在页面顶部，包含站点标题与导航链接
export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* 站点标题，点击返回首页 */}
        <Link href="/" className="site-title">
          {siteConfig.title}
        </Link>
        {/* 顶部导航：首页 / 关于我 */}
        <nav className="site-nav">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
