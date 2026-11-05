import { Fish } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutPage() {
  return (
    <div className="page-content">
      <Card>
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Fish className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">关于摸鱼办</h1>
            <p className="text-lg text-muted-foreground">
              这个人很懒，什么都没留下
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
