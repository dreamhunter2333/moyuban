import { useState } from 'react';
import { Base64 } from 'js-base64';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ToolLayout } from '@/components/tool-layout';
import { useClipboard } from '@/hooks';
import { CopyButton } from '@/components/copy-button';

export function Base64Page() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [error, setError] = useState('');
  const { copied: copiedLeft, copy: copyLeft } = useClipboard();
  const { copied: copiedRight, copy: copyRight } = useClipboard();

  const encode = () => {
    setError('');
    try {
      if (!leftText) {
        setRightText('');
        return;
      }
      const result = Base64.encode(leftText);
      if (!result) {
        setError('编码失败：结果为空');
        return;
      }
      setRightText(result);
    } catch (err) {
      setError(`编码失败: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const decode = () => {
    setError('');
    try {
      const cleanInput = rightText.replace(/\s/g, '');
      if (!cleanInput) {
        setLeftText('');
        return;
      }

      // 验证是否是合法的 Base64 字符串
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      if (!base64Regex.test(cleanInput)) {
        setError('解码失败：输入包含非法字符，请确保是有效的 Base64 字符串');
        return;
      }

      const result = Base64.decode(cleanInput);
      if (!result && cleanInput) {
        setError('解码失败：无法解码该 Base64 字符串');
        return;
      }
      setLeftText(result);
    } catch (err) {
      setError(`解码失败: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <ToolLayout title="Base64 编码/解码" description="Base64 编码解码工具">
      <div className="space-y-4">
        {error && (
          <div role="alert" className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
            {error}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* 左侧：原文 */}
        <div className="space-y-2 w-full min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="base64-original">原文</Label>
            <CopyButton
              copied={copiedLeft}
              variant="ghost"
              onClick={() => copyLeft(leftText)}
              disabled={!leftText}
              label="复制原文"
              copiedLabel="原文已复制"
            />
          </div>
          <Textarea
            id="base64-original"
            value={leftText}
            onChange={(e) => setLeftText(e.target.value)}
            placeholder="输入原文..."
            rows={10}
            className="min-h-48 font-mono"
          />
        </div>

        {/* 中间：转换按钮 */}
        <div className="flex md:flex-col gap-2 justify-center md:mt-8">
          <Button onClick={encode} disabled={!leftText} className="whitespace-nowrap">
            编码 →
          </Button>
          <Button onClick={decode} disabled={!rightText} className="whitespace-nowrap">
            ← 解码
          </Button>
        </div>

        {/* 右侧：Base64 */}
        <div className="space-y-2 w-full min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="base64-encoded">Base64</Label>
            <CopyButton
              copied={copiedRight}
              variant="ghost"
              onClick={() => copyRight(rightText)}
              disabled={!rightText}
              label="复制 Base64"
              copiedLabel="Base64 已复制"
            />
          </div>
          <Textarea
            id="base64-encoded"
            value={rightText}
            onChange={(e) => setRightText(e.target.value)}
            placeholder="输入 Base64..."
            rows={10}
            className="min-h-48 font-mono"
          />
        </div>
        </div>
      </div>
    </ToolLayout>
  );
}
