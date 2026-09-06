'use client';

import { useEffect, useState } from 'react';

// 高级感主题开关：切换 <html> 上的 .premium 类，并持久化到 localStorage
export default function PremiumToggle() {
  const [on, setOn] = useState(false);

  // 挂载时同步当前状态（避免服务端/客户端不一致）
  useEffect(() => {
    setOn(document.documentElement.classList.contains('premium'));
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.classList.toggle('premium', next);
    try {
      localStorage.setItem('premium-theme', next ? 'on' : 'off');
    } catch {
      /* 忽略隐私模式下的写入失败 */
    }
  };

  return (
    <button
      type="button"
      className="premium-toggle"
      onClick={toggle}
      aria-pressed={on}
      title="切换高级感主题"
    >
      {on ? '简约' : '✨ 高级感'}
    </button>
  );
}
