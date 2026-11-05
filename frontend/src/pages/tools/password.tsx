import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ToolLayout } from '@/components/tool-layout';
import { useClipboard } from '@/hooks';
import { api } from '@/api';

export function PasswordPage() {
  const [length, setLength] = useState(16);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const { copied, copy } = useClipboard();

  const generateToken = async () => {
    try {
      setLoading(true);
      const result = await api.generateToken(length);
      setToken(result);
    } catch (err) {
      console.error('Failed to generate token:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout title="密码生成" description="生成安全密码">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password-length">密码长度</Label>
          <Input
            id="password-length"
            type="number"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Math.max(8, Math.min(64, Number(e.target.value) || 8)))}
            className="w-full"
          />
          <Slider
            aria-label="密码长度"
            value={[length]}
            onValueChange={([value]) => setLength(value)}
            min={8}
            max={64}
            step={1}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={generateToken} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            生成密码
          </Button>
        </div>
        {token && (
          <div className="flex gap-2">
            <Input value={token} readOnly className="font-mono" aria-label="生成的密码" />
            <Button variant="outline" onClick={() => copy(token)} aria-label={copied ? '密码已复制' : '复制密码'}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
