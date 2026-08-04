// 站点级配置：标题、导航、页脚文案集中管理，方便一键修改
export const siteConfig = {
  title: '个人技术博客',
  description: '一个使用 Next.js（App Router）构建的个人技术博客，采用 Anthropic 设计风格。',
  author: '你的名字',
  // 顶部导航：首页 + 关于我
  nav: [
    { label: '首页', href: '/' },
    { label: '关于我', href: '/about' },
  ],
  // 页脚版权信息
  footerText: '© 2026 个人技术博客',
};
