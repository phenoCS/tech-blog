'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/posts';

// 文章目录：悬浮小地图，滚动时高亮当前所在小节（仅高级感模式显示）
export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );
    for (const item of toc) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [toc]);

  if (!toc.length) return null;

  return (
    <nav className="toc" aria-label="目录">
      <p className="toc-title">目录</p>
      <ul>
        {toc.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'toc-sub' : ''}>
            <a href={`#${item.id}`} className={activeId === item.id ? 'is-active' : ''}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
