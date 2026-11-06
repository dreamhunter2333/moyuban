import { Fish } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeading } from '@/components/page-heading';

export function AboutPage() {
  return (
    <div className="page-content">
      <PageHeading title="关于摸鱼办" />
      <Card>
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Fish className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">
              这个人很懒，什么都没留下
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
