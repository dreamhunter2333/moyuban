import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppStore } from '@/store';

export function SalarySettings() {
  const { salaryday, showSalary, setSalaryday, setShowSalary } = useAppStore();

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="show-salary">显示工资区</Label>
          <Switch id="show-salary" checked={showSalary} onCheckedChange={setShowSalary} />
        </div>
        <p className="text-sm text-muted-foreground">关闭后隐藏全部发薪日倒计时，保留周六和节假日信息。</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="salaryday">发薪日（每月）</Label>
        <Input
          id="salaryday"
          type="number"
          min={0}
          max={28}
          value={salaryday}
          disabled={!showSalary}
          onChange={(e) => setSalaryday(Number(e.target.value))}
        />
        <p className="text-sm text-muted-foreground">0 显示常见发薪日，1–28 仅显示指定发薪日。</p>
      </div>
    </div>
  );
}
