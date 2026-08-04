/** @type {import('next').NextConfig} */
// Next.js 最小化配置。remark/rehype 均为 ESM，
// Next 的打包器（webpack）会正常处理，无需额外 transpilePackages。
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
