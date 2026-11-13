import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ToolLayout } from '@/components/tool-layout';
import { useClipboard } from '@/hooks';
import { api } from '@/api';
import { CopyButton } from '@/components/copy-button';

export function PasswordPage() {
  const [length, setLength] = useState('16');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { copied, copy } = useClipboard();

  const generateToken = async () => {
    try {
      setLoading(true);
      setError('');
      const requestedLength = Number(length);
      const result = await api.generateToken(requestedLength);
      setToken(result.slice(0, requestedLength));
    } catch {
      setError('生成失败，请重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout title="密码生成" className="max-w-lg">
      <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); generateToken(); }}>
        <div className="space-y-2">
          <Label htmlFor="password-length">密码长度（8–64）</Label>
          <div className="flex items-center gap-4">
            <Input
              id="password-length"
              type="number"
              min={8}
              max={64}
              name="length"
              required
              disabled={loading}
              value={length}
              onChange={(event) => setLength(event.target.value)}
              className="w-20 shrink-0"
            />
            <Slider
              className="min-w-0 flex-1"
              aria-label="密码长度"
              value={[Math.max(8, Math.min(64, Number(length) || 8))]}
              onValueChange={([value]) => setLength(String(value))}
              min={8}
              max={64}
              step={1}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            <RefreshCw className={loading ? 'animate-spin' : ''} aria-hidden="true" />
            {loading ? '生成中' : '生成密码'}
          </Button>
        </div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <div className="space-y-2">
          <Label htmlFor="password-result">生成结果</Label>
          <div className="flex gap-2">
            <Input id="password-result" value={token} readOnly placeholder="生成的密码" className="min-w-0 font-mono" />
            <CopyButton copied={copied} onClick={() => copy(token)} disabled={!token} label="复制密码" copiedLabel="密码已复制" />
          </div>
        </div>
        <span role="status" className="sr-only">{token ? '密码已生成' : ''}</span>
      </form>
    </ToolLayout>
  );
}
