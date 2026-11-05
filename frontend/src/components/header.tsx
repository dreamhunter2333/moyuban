import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Github, Fish } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';
import { useIsMobile } from '@/hooks';

const navItems = [
  { path: '/', label: '首页' },
  { path: '/tools', label: '工具' },
  { path: '/progress', label: '进度' },
  { path: '/about', label: '关于' },
];

export function Header() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useAppStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="app-width flex h-18 items-center gap-5">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 mr-2 rounded-md">
          <Fish className="h-7 w-7 text-primary" aria-hidden="true" />
          <span className="font-semibold text-lg tracking-tight">摸鱼办</span>
        </Link>

        {!isMobile && (
          <nav className="flex items-center gap-1" aria-label="主导航">
            {navItems.map((item) => (
              <Button
                key={item.path}
                asChild
                variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                className="app-nav-link"
              >
                <Link to={item.path} aria-current={location.pathname === item.path ? 'page' : undefined}>
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        )}

        <div className="flex-1" />

        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? '切换浅色模式' : '切换深色模式'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button asChild variant="ghost" size="icon">
            <a
              href="https://github.com/dreamhunter2333/moyuban"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="查看 GitHub 源码（新窗口）"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? '收起导航' : '展开导航'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {isMobile && menuOpen && (
        <nav id="mobile-navigation" className="border-t bg-card py-3" aria-label="主导航">
          <div className="app-width grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                asChild
                variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                className="app-nav-link justify-start"
              >
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
