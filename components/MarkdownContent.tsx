// Markdown 渲染组件：把已渲染好的 HTML 字符串注入到 .markdown-body 容器中
export default function MarkdownContent({ html }: { html: string }) {
  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
