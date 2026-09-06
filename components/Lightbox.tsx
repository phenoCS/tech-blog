'use client';

import { useEffect, useState } from 'react';

// 图片点击放大：点击正文图片全屏查看（仅高级感模式显示遮罩）
export default function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && target.closest('.markdown-body')) {
        e.preventDefault();
        setSrc((target as HTMLImageElement).src);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!src) return null;
  return (
    <div
      className="lightbox"
      onClick={() => setSrc(null)}
      role="dialog"
      aria-modal="true"
    >
      <img src={src} alt="" />
    </div>
  );
}
