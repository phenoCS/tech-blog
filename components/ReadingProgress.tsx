'use client';

import { useEffect, useState } from 'react';

// 阅读进度条：随页面滚动更新宽度；仅在 html.premium 下通过 CSS 显示
export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setWidth(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className="premium-progress" style={{ width: `${width}%` }} />;
}
