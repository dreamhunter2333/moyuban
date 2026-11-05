import { Link } from 'react-router-dom';
import { Lock, Link2, FileCode, Share2, ArrowUpRight } from 'lucide-react';

const TOOLS = [
  {
    id: 'share-tool',
    title: '分享工具',
    description: '生成分享链接和二维码',
    icon: Share2,
    path: '/tools/share-tool',
  },
  {
    id: 'password',
    title: '密码生成',
    description: '生成安全随机密码',
    icon: Lock,
    path: '/tools/password',
  },
  {
    id: 'url-encoder',
    title: 'URL 编码/解码',
    description: 'URL 编码解码工具',
    icon: Link2,
    path: '/tools/url-encoder',
  },
  {
    id: 'base64',
    title: 'Base64 编码/解码',
    description: 'Base64 编码解码工具',
    icon: FileCode,
    path: '/tools/base64',
  },
];

export function ToolsPage() {
  return (
    <div className="page-content">
      <h1 className="text-2xl font-semibold tracking-tight mb-6 sm:mb-8">工具集</h1>
      <div className="grid gap-x-10 md:grid-cols-2">
        {TOOLS.map(({ id, title, description, icon: Icon, path }) => (
          <Link
            key={id}
            to={path}
            className="tool-link group"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="p-3 bg-muted rounded-xl shrink-0">
                <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-medium leading-6 text-base">{title}</h2>
                <div className="text-sm text-muted-foreground mt-1.5">{description}</div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
