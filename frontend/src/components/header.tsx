import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CalendarDays, Clock3, CodeXml, Fish, Info, Menu, Moon, Settings2, Sun, Wrench, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';
import { useIsMobile } from '@/hooks';

const navItems = [
  { path: '/', label: '摸鱼日历', icon: CalendarDays },
  { path: '/tools', label: '工具集', icon: Wrench },
  { path: '/progress', label: '时间进度', icon: Clock3 },
  { path: '/settings', label: '设置', icon: Settings2 },
  { path: '/about', label: '关于', icon: Info },
];

export function Header() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useAppStore();

  const navigation = (
    <nav className="navigation-links" aria-label="主导航">
      {navItems.map(({ path, label, icon: Icon }) => (
        <Button key={path} asChild variant="ghost" className="navigation-link">
          <NavLink to={path} end={path === '/'} onClick={() => setMenuOpen(false)}>
            <Icon aria-hidden="true" />
            {label}
          </NavLink>
        </Button>
      ))}
    </nav>
  );

  return (
    <header className="app-navigation">
      <Link to="/" className="navigation-brand" aria-label="摸鱼办首页">
        <Fish className="size-7" aria-hidden="true" />
        <span>摸鱼办</span>
      </Link>
      {!isMobile && navigation}
      <div className="navigation-actions">
        {isMobile && (
          <Button asChild variant="ghost" className="mobile-tools-link">
            <Link to="/tools">工具</Link>
          </Button>
        )}
        <Button
          variant="ghost"
          size={isMobile ? 'icon' : 'default'}
          onClick={toggleTheme}
          aria-label={isDark ? '切换浅色模式' : '切换深色模式'}
          className="navigation-action"
        >
          {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          {!isMobile && <span>{isDark ? '浅色模式' : '深色模式'}</span>}
        </Button>
        {!isMobile && (
          <Button asChild variant="ghost" className="navigation-action">
            <a href="https://github.com/dreamhunter2333/moyuban" target="_blank" rel="noopener noreferrer">
              <CodeXml aria-hidden="true" />
              GitHub
              <span className="sr-only">（新窗口）</span>
            </a>
          </Button>
        )}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '收起导航' : '展开导航'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        )}
      </div>
      {isMobile && menuOpen && <div id="mobile-navigation">{navigation}</div>}
    </header>
  );
}
