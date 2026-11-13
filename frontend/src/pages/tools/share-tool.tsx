import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import LZString from 'lz-string';
import { QRCodeSVG } from 'qrcode.react';
import { Share2, Edit3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClipboard, useIsMobile } from '@/hooks';
import { ToolLayout } from '@/components/tool-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CopyButton } from '@/components/copy-button';
import { MarkdownContent } from '@/components/markdown-content';

type ContentType = 'text' | 'html' | 'markdown';

export function ShareToolPage() {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const [showShare, setShowShare] = useState(false);
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
    setShowShare(true);
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
        return <MarkdownContent>{content}</MarkdownContent>;
      default:
        return <pre className="whitespace-pre-wrap font-mono text-sm">{content}</pre>;
    }
  };

  const qrSize = isMobile ? Math.min(window.innerWidth - 80, 200) : 200;

  return (
    <ToolLayout
      title="分享工具"
      actions={
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <Eye aria-hidden="true" /> : <Edit3 aria-hidden="true" />}
          {isEditing ? '预览' : '编辑'}
        </Button>
      }
    >
      <div className="space-y-4">
        <Tabs value={contentType} onValueChange={(v) => setContentType(v as ContentType)}>
          <TabsList aria-label="内容类型" className="grid w-full grid-cols-3 group-data-horizontal/tabs:h-auto">
            <TabsTrigger value="text" className="min-h-11">纯文本</TabsTrigger>
            <TabsTrigger value="html" className="min-h-11">HTML</TabsTrigger>
            <TabsTrigger value="markdown" className="min-h-11">Markdown</TabsTrigger>
          </TabsList>
        </Tabs>
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="share-content">分享内容</Label>
            <Textarea
              id="share-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="输入要分享的内容..."
              rows={6}
              className="min-h-40 font-mono"
            />
          </div>
        ) : (
          <div>
            {content ? renderContent() : <span className="text-muted-foreground">暂无内容</span>}
          </div>
        )}
        {content && (
          <div className="space-y-3">
            <Button onClick={handleShare}><Share2 aria-hidden="true" />{copied ? '链接已复制' : '生成分享链接'}</Button>
            {showShare && (
              <>
                <div className="flex gap-2">
                  <Input value={shareUrl} readOnly aria-label="分享链接" className="min-w-0 font-mono" />
                  <CopyButton copied={copied} onClick={() => copy(shareUrl)} label="复制分享链接" copiedLabel="分享链接已复制" />
                </div>
                <div className="w-fit rounded-md bg-white p-3"><QRCodeSVG value={shareUrl} size={qrSize} /></div>
              </>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
