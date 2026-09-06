import type { Metadata } from 'next';
import '@/styles/globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ReadingProgress from '@/components/ReadingProgress';
import BackToTop from '@/components/BackToTop';
import { siteConfig } from '@/lib/site-config';

// 站点级 <title>：子页面可用 template 自动追加站点名
export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

// 根布局：固定导航栏 + 居中主体 + 深色页脚
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 无闪烁：在首屏绘制前同步高级感主题状态，避免刷新时闪一下 */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('premium-theme')==='on'){document.documentElement.classList.add('premium');}}catch(e){}",
          }}
        />
        {/* 引入 Inter / JetBrains Mono 网络字体；离线时自动回退到 system-ui / Menlo */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* 规范要求：可直接嵌入 Google Fonts 链接（离线时回退系统字体）。
           关闭 Next 对该用法的建议性 lint 警告。 */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReadingProgress />
        <BackToTop />
        <SiteHeader />
        <main className="site-main">
          <div className="site-container">{children}</div>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
