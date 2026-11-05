import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/api';
import { useAppStore } from '@/store';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TOOLS } from '@/lib/tools';

export function HomePage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const salaryday = useAppStore((state) => state.salaryday);
  const showSalary = useAppStore((state) => state.showSalary);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getMoyuMessage(salaryday || undefined, showSalary);
        setContent(data);
      } catch (err) {
        setError('加载失败，请刷新重试');
        console.error('Failed to fetch moyu message:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [salaryday, showSalary]);

  if (loading) {
    return (
      <Card aria-busy="true" aria-label="正在加载摸鱼日历">
        <CardContent className="p-5 sm:p-8 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-6 w-1/2 mt-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card role="alert">
        <CardContent className="p-8 text-center text-destructive">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="home-layout">
      <article className="home-page" aria-label="摸鱼日历">
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </article>
      <aside className="quick-tools" aria-label="常用工具">
        <div className="section-heading">
          <h2>常用工具</h2>
          <Link to="/tools">全部工具 <ArrowRight aria-hidden="true" /></Link>
        </div>
        <ul>
          {TOOLS.map(({ id, title, description, icon: Icon, path }) => (
            <li key={id}>
              <Link to={path} className="tool-index-link">
                <Icon aria-hidden="true" />
                <span><strong>{title}</strong><small>{description}</small></span>
                <ArrowRight className="tool-index-arrow" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/settings" className="preferences-link">管理工资显示与工作时间 <ArrowRight aria-hidden="true" /></Link>
      </aside>
    </div>
  );
}
