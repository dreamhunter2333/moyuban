import { useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from '@/components/copy-button';
import { ToolLayout } from '@/components/tool-layout';
import { useClipboard } from '@/hooks';

interface TextConverterProps {
  title: string;
  encodedLabel: string;
  encode: (value: string) => string;
  decode: (value: string) => string;
  options?: ReactNode;
}

export function TextConverter({ title, encodedLabel, encode, decode, options }: TextConverterProps) {
  const [source, setSource] = useState('');
  const [encoded, setEncoded] = useState('');
  const [error, setError] = useState<'source' | 'encoded' | null>(null);
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const encodedRef = useRef<HTMLTextAreaElement>(null);
  const sourceClipboard = useClipboard();
  const encodedClipboard = useClipboard();

  const convert = (encoding: boolean) => {
    setError(null);
    try {
      if (encoding) {
        setEncoded(encode(source));
        return;
      }
      setSource(decode(encoded));
    } catch {
      setError(encoding ? 'source' : 'encoded');
      (encoding ? sourceRef : encodedRef).current?.focus();
    }
  };

  const clear = () => {
    setSource('');
    setEncoded('');
    setError(null);
    sourceRef.current?.focus();
  };

  return (
    <ToolLayout title={title}>
      <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); convert(true); }}>
        {options}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="converter-source">原文</Label>
              <CopyButton variant="ghost" copied={sourceClipboard.copied} onClick={() => sourceClipboard.copy(source)} disabled={!source} label="复制原文" copiedLabel="原文已复制" />
            </div>
            <Textarea
              ref={sourceRef}
              id="converter-source"
              name="source"
              value={source}
              onChange={(event) => { setSource(event.target.value); setError(null); }}
              aria-invalid={error === 'source'}
              aria-describedby={error === 'source' ? 'converter-error' : undefined}
              placeholder="输入原文"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              rows={4}
              className="min-h-32 font-mono"
            />
          </div>
          <div className="min-w-0 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="converter-encoded">{encodedLabel}</Label>
              <CopyButton variant="ghost" copied={encodedClipboard.copied} onClick={() => encodedClipboard.copy(encoded)} disabled={!encoded} label="复制编码文本" copiedLabel="编码文本已复制" />
            </div>
            <Textarea
              ref={encodedRef}
              id="converter-encoded"
              name="encoded"
              value={encoded}
              onChange={(event) => { setEncoded(event.target.value); setError(null); }}
              aria-invalid={error === 'encoded'}
              aria-describedby={error === 'encoded' ? 'converter-error' : undefined}
              placeholder="输入编码文本以解码"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              rows={4}
              className="min-h-32 font-mono"
            />
          </div>
        </div>
        {error && <p id="converter-error" role="alert" className="text-sm text-destructive">{error === 'source' ? '编码失败，请检查原文。' : `解码失败，请检查${encodedLabel}格式。`}</p>}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={!source}><ArrowRight aria-hidden="true" />编码</Button>
          <Button type="button" variant="outline" disabled={!encoded} onClick={() => convert(false)}><ArrowLeft aria-hidden="true" />解码</Button>
          <Button type="button" variant="ghost" className="ms-auto" disabled={!source && !encoded} onClick={clear}><RotateCcw aria-hidden="true" />清空</Button>
        </div>
      </form>
    </ToolLayout>
  );
}
