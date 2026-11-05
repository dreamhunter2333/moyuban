import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LZString from 'lz-string';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Share2, Edit3, Eye, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClipboard, useIsMobile } from '@/hooks';

type ContentType = 'text' | 'html' | 'markdown';

export function ShareToolPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Parse initial state only once on mount using lazy initialization
  const [content, setContent] = useState(() => {
    const encodedContent = searchParams.get('content');
    if (encodedContent) {
      try {
        return LZString.decompressFromEncodedURIComponent(encodedContent) || '';
      } catch {
        return '';
      }
    }
    return '';
  });

  const [contentType, setContentType] = useState<ContentType>(() => {
    const type = searchParams.get('contentType') as ContentType | null;
    if (type && ['text', 'html', 'markdown'].includes(type)) {
      return type;
    }
    return 'text';
  });

  const [isEditing, setIsEditing] = useState(() => {
    const encodedContent = searchParams.get('content');
    return !encodedContent;
  });

  const { copied, copy } = useClipboard();
  const isMobile = useIsMobile();

  const shareUrl = useMemo(() => {
    if (!content) return '';
    const compressed = LZString.compressToEncodedURIComponent(content);
    const url = new URL(window.location.href);
    url.searchParams.set('content', compressed);
    url.searchParams.set('contentType', contentType);
    return url.toString();
  }, [content, contentType]);

  const handleShare = () => {
    if (!content) return;
    const compressed = LZString.compressToEncodedURIComponent(content);
    setSearchParams({
      content: compressed,
      contentType,
    });
    copy(shareUrl);
  };

  const renderContent = () => {
    switch (contentType) {
      case 'html':
        return (
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      case 'markdown':
        return (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        );
      default:
        return <pre className="whitespace-pre-wrap font-mono text-sm">{content}</pre>;
    }
  };

  const qrSize = isMobile ? Math.min(window.innerWidth - 80, 200) : 200;

  return (
    <div className="page-content space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/tools')}
          aria-label="返回工具列表"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight flex-1">分享工具</h1>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Eye className="h-4 w-4 mr-2" />
              预览
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4 mr-2" />
              编辑
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">内容类型</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={contentType} onValueChange={(v) => setContentType(v as ContentType)}>
            <TabsList className="grid h-auto w-full grid-cols-3">
              <TabsTrigger value="text" className="min-h-11">纯文本</TabsTrigger>
              <TabsTrigger value="html" className="min-h-11">HTML</TabsTrigger>
              <TabsTrigger value="markdown" className="min-h-11">Markdown</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {isEditing ? '编辑内容' : '预览'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              aria-label="要分享的内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="输入要分享的内容..."
              rows={10}
              className="font-mono"
            />
          ) : (
            <div className="min-h-[200px]">
              {content ? renderContent() : <span className="text-muted-foreground">暂无内容</span>}
            </div>
          )}
        </CardContent>
      </Card>

      {content && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">分享</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={handleShare} className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                生成分享链接
              </Button>
              {shareUrl && (
                <Button variant="outline" onClick={() => copy(shareUrl)} aria-label={copied ? '分享链接已复制' : '复制分享链接'}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
            {shareUrl && (
              <>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-mono break-all">{shareUrl}</p>
                </div>
                <div className="flex justify-center p-4 bg-white rounded-md">
                  <QRCodeSVG value={shareUrl} size={qrSize} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
