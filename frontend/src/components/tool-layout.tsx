import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ToolLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <header className="page-heading tool-heading">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/tools')}
          aria-label="返回工具列表"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </header>
      <Card className="tool-surface">
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
