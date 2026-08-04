import { formatDate } from '@/lib/date';

// 日期展示组件：无衬线 12px、次要文字色
export default function PostDate({ date }: { date: string }) {
  return <p className="post-date">{formatDate(date)}</p>;
}
