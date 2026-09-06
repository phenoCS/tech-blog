'use client';

import { useEffect } from 'react';

// 给代码块加悬停"复制"按钮（仅高级感模式下通过 CSS 显示）
export default function EnhanceCode() {
  useEffect(() => {
    const blocks = Array.from(
      document.querySelectorAll<HTMLPreElement>('.markdown-body pre')
    );
    const cleanups: Array<() => void> = [];

    blocks.forEach((pre) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = '复制';
      const onClick = async () => {
        const code = pre.querySelector('code')?.innerText ?? pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          btn.textContent = '已复制';
          setTimeout(() => (btn.textContent = '复制'), 1500);
        } catch {
          btn.textContent = '失败';
        }
      };
      btn.addEventListener('click', onClick);
      pre.appendChild(btn);
      cleanups.push(() => btn.removeEventListener('click', onClick));
    });

    return () => {
      cleanups.forEach((c) => c());
      blocks.forEach((pre) => pre.querySelector('.copy-btn')?.remove());
    };
  }, []);

  return null;
}
