import { FileCode, Link2, Lock, Share2 } from 'lucide-react';

export const TOOLS = [
  { id: 'share-tool', title: '分享工具', description: '生成分享链接和二维码', icon: Share2, path: '/tools/share-tool' },
  { id: 'password', title: '密码生成', description: '生成安全随机密码', icon: Lock, path: '/tools/password' },
  { id: 'url-encoder', title: 'URL 编码/解码', description: 'URL 编码解码工具', icon: Link2, path: '/tools/url-encoder' },
  { id: 'base64', title: 'Base64 编码/解码', description: 'Base64 编码解码工具', icon: FileCode, path: '/tools/base64' },
];
