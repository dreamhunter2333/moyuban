import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppStore } from '@/store';
import { SalarySettings } from '@/components/salary-settings';

const WEEKDAYS = [
  { value: 1, label: '周一' },
  { value: 2, label: '周二' },
  { value: 3, label: '周三' },
  { value: 4, label: '周四' },
  { value: 5, label: '周五' },
  { value: 6, label: '周六' },
  { value: 7, label: '周日' },
];

export function SettingsPage() {
  const { progressSettings, setProgressSettings } = useAppStore();

  const handleWorkdayChange = (day: number, checked: boolean) => {
    const newWorkdays = checked
      ? [...progressSettings.workdays, day].sort((a, b) => a - b)
      : progressSettings.workdays.filter((d) => d !== day);
    setProgressSettings({ workdays: newWorkdays });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">设置</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">发薪日设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SalarySettings />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">工作时间设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>工作日</Label>
            <div className="flex flex-wrap gap-4">
              {WEEKDAYS.map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`workday-${value}`}
                    checked={progressSettings.workdays.includes(value)}
                    onCheckedChange={(checked) => handleWorkdayChange(value, checked === true)}
                  />
                  <Label htmlFor={`workday-${value}`} className="cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="workStartHour">上班时间</Label>
              <Input
                id="workStartHour"
                type="number"
                min={0}
                max={12}
                value={progressSettings.workStartHour}
                onChange={(e) => setProgressSettings({ workStartHour: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workEndHour">下班时间</Label>
              <Input
                id="workEndHour"
                type="number"
                min={12}
                max={23}
                value={progressSettings.workEndHour}
                onChange={(e) => setProgressSettings({ workEndHour: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">日薪 (元)</Label>
            <Input
              id="salary"
              type="number"
              min={0}
              value={progressSettings.salary}
              onChange={(e) => setProgressSettings({ salary: Number(e.target.value) })}
            />
            <p className="text-sm text-muted-foreground">
              用于计算工作时段内已赚取的金额
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
