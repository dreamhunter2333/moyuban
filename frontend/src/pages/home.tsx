import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/api';
import { useAppStore } from '@/store';

export function HomePage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const salaryday = useAppStore((state) => state.salaryday);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getMoyuMessage(salaryday || undefined);
        setContent(data);
      } catch (err) {
        setError('加载失败，请刷新重试');
        console.error('Failed to fetch moyu message:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [salaryday]);

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
    <article className="home-page" aria-label="摸鱼日历">
      <div className="markdown-content home-message">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </article>
  );
}
