import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ToolLayout } from '@/components/tool-layout';
import { useClipboard } from '@/hooks';
import { CopyButton } from '@/components/copy-button';

export function UrlEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { copied, copy } = useClipboard();

  const encode = (useComponent: boolean) => {
    try {
      setOutput(useComponent ? encodeURIComponent(input) : encodeURI(input));
    } catch (err) {
      setOutput(`编码失败: ${err}`);
    }
  };

  const decode = (useComponent: boolean) => {
    try {
      setOutput(useComponent ? decodeURIComponent(input) : decodeURI(input));
    } catch (err) {
      setOutput(`解码失败: ${err}`);
    }
  };

  return (
    <ToolLayout title="URL 编码/解码" description="URL 编码解码工具">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url-input">输入</Label>
          <Textarea
            id="url-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入需要编码/解码的内容..."
            rows={5}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => encode(false)}>
            encodeURI
          </Button>
          <Button variant="secondary" onClick={() => decode(false)}>
            decodeURI
          </Button>
          <Button variant="secondary" onClick={() => encode(true)}>
            encodeURIComponent
          </Button>
          <Button variant="secondary" onClick={() => decode(true)}>
            decodeURIComponent
          </Button>
        </div>
        {output && (
          <div className="space-y-2">
            <Label htmlFor="url-output">输出</Label>
            <div className="flex gap-2">
              <Textarea id="url-output" value={output} readOnly rows={5} className="font-mono" />
              <CopyButton copied={copied} onClick={() => copy(output)} label="复制结果" copiedLabel="结果已复制" className="shrink-0" />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
