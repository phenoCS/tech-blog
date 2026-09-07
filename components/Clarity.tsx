'use client';

import { useEffect } from 'react';
import clarity from '@microsoft/clarity';

// Clarity 项目 ID（在 clarity.microsoft.com 创建项目后获取）。
// 该 ID 本就是公开、嵌在浏览器脚本里的，直接写死即可，无需环境变量。
const CLARITY_ID = 'yejbau96a0';

export default function Clarity() {
  useEffect(() => {
    clarity.init(CLARITY_ID);
  }, []);

  return null;
}
