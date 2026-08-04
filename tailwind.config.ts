import type { Config } from 'tailwindcss';

/**
 * 设计令牌集中地：所有 Anthropic 风格的颜色 / 字体 / 圆角 / 页宽都定义在这里，
 * globals.css 中通过 @apply 引用这些令牌。后续换肤只需改本文件。
 *
 * 同时在 theme（而非 extend）中删除 boxShadow / dropShadow / backgroundImage，
 * 从工具链层面杜绝阴影、渐变、发光等违规样式。
 */
const config: Config = {
  // 毛坯房阶段工具类几乎都写在 globals.css 的 @apply 中，
  // 因此把 styles 目录一并纳入扫描范围（否则 Tailwind 会提示未检测到工具类）。
  content: [
    './app/**/*.{js,ts,jsx,tsx,md}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.css',
  ],
  theme: {
    // 删除所有阴影工具类
    boxShadow: {
      none: 'none',
    },
    // 删除所有投影工具类
    dropShadow: {
      none: '0 0 #0000',
    },
    // 清空背景图（含渐变），杜绝渐变用法
    backgroundImage: {},
    extend: {
      colors: {
        canvas: '#f0eee6', // 页面背景
        surface: '#faf9f5', // 卡片/面板背景
        featured: '#f5e3c7', // 特色/置顶卡片背景
        ink: '#141413', // 主文字
        muted: '#b0aea5', // 次要文字（辅助、日期）
        line: '#cccbc8', // 边框/分割线
        clay: '#d97757', // 主要操作色
        'clay-hover': '#c6613f', // Clay 悬停态
      },
      fontFamily: {
        // 正文与标题：衬线体（Georgia 不含中文，补中文衬线后备）
        serif: [
          'Georgia',
          '"Source Serif Pro"',
          'Charter',
          '"Songti SC"',
          '"Noto Serif CJK SC"',
          'STSong',
          'SimSun',
          'serif',
        ],
        // UI 元素：无衬线体
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
        // 代码块：等宽字体
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', '"Courier New"', 'monospace'],
      },
      fontSize: {
        // 正文：20px / 行高 1.4
        body: ['20px', { lineHeight: '1.4' }],
        // UI 字号阶梯
        'ui-xs': ['12px', { lineHeight: '1.4' }],
        'ui-sm': ['14px', { lineHeight: '1.4' }],
        'ui-base': ['16px', { lineHeight: '1.4' }],
        // 标题阶梯：H1 48 / H2 32 / H3 24
        'h1': ['48px', { lineHeight: '1.2' }],
        'h2': ['32px', { lineHeight: '1.25' }],
        'h3': ['24px', { lineHeight: '1.3' }],
      },
      borderRadius: {
        // 卡片圆角 24px
        card: '24px',
        // 按钮「只有底部」圆角 8px（顶部直角由组件单独处理）
        btn: '8px',
      },
      maxWidth: {
        // 页面最大宽度 1280px
        content: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
