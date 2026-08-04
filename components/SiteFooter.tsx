import { siteConfig } from '@/lib/site-config';

// 站点底部：深色背景，显示版权信息
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p style={{ margin: 0 }}>{siteConfig.footerText}</p>
      </div>
    </footer>
  );
}
