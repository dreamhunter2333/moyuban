import { Outlet } from 'react-router-dom';
import { Header } from './header';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">跳到主要内容</a>
      <Header />
      <main id="main-content" tabIndex={-1} className="app-width flex-1 py-6 sm:py-10">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-xs leading-6 text-muted-foreground">
        <p className="app-width">
          摸鱼办 - 一个集成各种工具的网站 |{' '}
          <a
            href="https://github.com/dreamhunter2333/moyuban"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
