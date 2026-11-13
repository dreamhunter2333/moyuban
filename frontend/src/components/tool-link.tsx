import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { TOOLS } from '@/lib/tools';

export function ToolLink({ tool }: { tool: typeof TOOLS[number] }) {
  const { title, description, icon: Icon, path } = tool;

  return (
    <Link to={path} className="tool-index-link">
      <span className="tool-icon"><Icon aria-hidden="true" /></span>
      <span className="tool-copy"><strong>{title}</strong><small>{description}</small></span>
      <ArrowUpRight className="tool-index-arrow" aria-hidden="true" />
    </Link>
  );
}
