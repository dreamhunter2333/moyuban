import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock3, RefreshCw, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeading } from '@/components/page-heading';
import { ToolLink } from '@/components/tool-link';
import { MarkdownContent } from '@/components/markdown-content';
import { api } from '@/api';
import { useAppStore } from '@/store';
import { TOOLS } from '@/lib/tools';

export function HomePage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const salaryday = useAppStore((state) => state.salaryday);
  const showSalary = useAppStore((state) => state.showSalary);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await api.getMoyuMessage(salaryday || undefined, showSalary);
        if (!cancelled) setContent(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [salaryday, showSalary, retry]);

  return (
    <div className="page-content">
      <PageHeading
        title="摸鱼日历"
        actions={<Button asChild variant="outline"><Link to="/progress"><Clock3 aria-hidden="true" />查看时间进度</Link></Button>}
      />
      <div className="home-layout">
        <article className="home-page" aria-label="摸鱼日历" aria-busy={loading}>
          {loading ? (
            <div className="calendar-loading space-y-5" role="status" aria-label="正在加载摸鱼日历">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-6 w-1/3 mt-10" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : error ? (
            <div className="calendar-error" role="alert">
              <CalendarDays className="size-8 text-muted-foreground" aria-hidden="true" />
              <h2>日历加载失败</h2>
              <p>请检查网络后重试。</p>
              <Button variant="outline" onClick={() => setRetry((value) => value + 1)}><RefreshCw aria-hidden="true" />重新加载</Button>
            </div>
          ) : (
            <MarkdownContent>{content}</MarkdownContent>
          )}
        </article>
        <aside className="quick-tools" aria-label="常用工具">
          <div className="section-heading">
            <h2>随手工具</h2>
            <Link to="/tools">查看全部 <ArrowRight aria-hidden="true" /></Link>
          </div>
          <ul>
            {TOOLS.map((tool) => <li key={tool.id}><ToolLink tool={tool} /></li>)}
          </ul>
          <Link to="/settings" className="preferences-link"><Settings2 aria-hidden="true" /><span>管理工资显示与工作时间</span><ArrowRight aria-hidden="true" /></Link>
        </aside>
      </div>
    </div>
  );
}
