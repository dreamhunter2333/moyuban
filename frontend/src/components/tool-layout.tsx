import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeading } from '@/components/page-heading';
import { cn } from '@/lib/utils';

interface ToolLayoutProps {
  title: string;
  className?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function ToolLayout({ title, className, actions, children }: ToolLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className={cn('page-content tool-workspace', className)}>
      <PageHeading
        title={title}
        actions={actions}
        leading={
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/tools')}
            aria-label="返回工具列表"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        }
      />
      <Card>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
