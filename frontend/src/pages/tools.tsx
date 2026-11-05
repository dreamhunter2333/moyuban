import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TOOLS } from '@/lib/tools';

export function ToolsPage() {
  return (
    <div className="page-content">
      <header className="page-heading">
        <h1>工具集</h1>
        <p>编码、生成、分享，随手打开就能用。</p>
      </header>
      <div className="tools-index">
        {TOOLS.map(({ id, title, description, icon: Icon, path }) => (
          <Link key={id} to={path} className="tool-index-link">
            <Icon aria-hidden="true" />
            <span><strong>{title}</strong><small>{description}</small></span>
            <ArrowRight className="tool-index-arrow" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
