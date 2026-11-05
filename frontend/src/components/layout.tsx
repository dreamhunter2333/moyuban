import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function Layout() {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">跳到主要内容</a>
      <Header />
      <div className="app-workspace">
        <main id="main-content" tabIndex={-1} className="workspace-main">
          <Suspense fallback={
            <div role="status" aria-label="正在加载页面" className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-64 w-full" />
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
        <footer className="workspace-footer">
          <span>摸鱼办 · 一个集成各种工具的网站</span>
          <a href="https://github.com/dreamhunter2333/moyuban" target="_blank" rel="noopener noreferrer">
            GitHub<span className="sr-only">（新窗口）</span>
          </a>
        </footer>
      </div>
    </div>
  );
}
