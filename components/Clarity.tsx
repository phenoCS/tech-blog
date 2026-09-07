'use client';

import { useEffect } from 'react';
import clarity from '@microsoft/clarity';

// Clarity 项目 ID：在 clarity.microsoft.com 创建项目后获取，
// 通过环境变量 NEXT_PUBLIC_CLARITY_ID 注入（避免把密钥写死在代码里）。
export default function Clarity() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (id) {
      clarity.init(id);
    }
  }, []);

  return null;
}
