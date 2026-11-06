import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, X } from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import { SalarySettings } from '@/components/salary-settings';
import { PageHeading } from '@/components/page-heading';

interface ProgressItemProps {
  title: string;
  value: number;
  description?: string;
  extra?: React.ReactNode;
}

function ProgressItem({ title, value, description, extra }: ProgressItemProps) {
  const getColor = (v: number) => {
    if (v < 60) return 'bg-emerald-600 dark:bg-emerald-400';
    if (v < 75) return 'bg-sky-600 dark:bg-sky-400';
    return 'bg-rose-600 dark:bg-rose-400';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <Badge variant="outline">{value.toFixed(1)}%</Badge>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <Progress
          aria-label={title}
          value={value}
          className="h-3"
          indicatorClassName={cn(getColor(value))}
        />
        {extra && <div className="mt-2 text-sm text-muted-foreground">{extra}</div>}
      </CardContent>
    </Card>
  );
}

const WEEKDAYS = [
  { value: 1, label: '周一' },
  { value: 2, label: '周二' },
  { value: 3, label: '周三' },
  { value: 4, label: '周四' },
  { value: 5, label: '周五' },
  { value: 6, label: '周六' },
  { value: 7, label: '周日' },
];

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { progressSettings, setProgressSettings } = useAppStore();

  const handleWorkdayChange = (day: number, checked: boolean) => {
    const newWorkdays = checked
      ? [...progressSettings.workdays, day].sort((a, b) => a - b)
      : progressSettings.workdays.filter((d) => d !== day);
    setProgressSettings({ workdays: newWorkdays });
  };

  return (
    <Card id="progress-settings" className="mb-6" role="region" aria-labelledby="progress-settings-title">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle id="progress-settings-title">设置</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="关闭设置">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <SalarySettings />

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">工作日</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {WEEKDAYS.map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`workday-${value}`}
                  checked={progressSettings.workdays.includes(value)}
                  onCheckedChange={(checked) => handleWorkdayChange(value, checked === true)}
                />
                <Label htmlFor={`workday-${value}`} className="min-h-11 cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </fieldset>

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
  );
}

export function ProgressPage() {
  const progressSettings = useAppStore((state) => state.progressSettings);
  const [now, setNow] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Today's progress
  const dayProgress = (() => {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return ((hours * 60 + minutes) / (24 * 60)) * 100;
  })();

  // Work time progress
  const workProgress = (() => {
    const { workStartHour, workEndHour, salary, workdays } = progressSettings;
    const dayOfWeek = now.getDay() || 7; // 转换为 1-7，周日为7
    const isWorkday = workdays.includes(dayOfWeek);

    // 如果不是工作日
    if (!isWorkday) {
      return { progress: 0, earned: 0, status: '休息日' };
    }

    const currentHour = now.getHours();

    if (currentHour < workStartHour) {
      return { progress: 0, earned: 0, status: '未开始' };
    }
    if (currentHour >= workEndHour) {
      return { progress: 100, earned: salary, status: '已下班' };
    }

    // 使用精确的时间戳计算
    const workStartTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      workStartHour,
      0,
      0
    ).getTime();
    const workEndTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      workEndHour,
      0,
      0
    ).getTime();
    const currentTime = now.getTime();

    const progress = ((currentTime - workStartTime) / (workEndTime - workStartTime)) * 100;
    const earned = (progress * salary) / 100;

    return { progress, earned, status: '工作中' };
  })();

  // Week progress
  const weekProgress = (() => {
    const weekday = now.getDay() === 0 ? 6 : now.getDay() - 1; // 周日为6，周一为0
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return ((weekday * 24 * 60 + hours * 60 + minutes) / (7 * 24 * 60)) * 100;
  })();

  // Workdays progress
  const workdaysProgress = (() => {
    const { workdays } = progressSettings;
    if (workdays.length === 0) return 0;

    const currentDayOfWeek = now.getDay();
    const passedWorkdays = workdays.filter((day) => day < currentDayOfWeek).length;

    let passedWorkdaysTime = passedWorkdays * 24 * 60;

    // 如果今天是工作日，加上今天已过去的时间
    if (workdays.includes(currentDayOfWeek)) {
      passedWorkdaysTime += now.getHours() * 60 + now.getMinutes();
    }

    const progress = (passedWorkdaysTime / (workdays.length * 24 * 60)) * 100;
    return Math.min(progress, 100);
  })();

  // Month progress
  const monthProgress = (() => {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();
    const currentTime = now.getTime();

    const passedDays = Math.floor((currentTime - monthStart) / (24 * 60 * 60 * 1000));
    const totalDays = Math.floor((nextMonthStart - monthStart) / (24 * 60 * 60 * 1000));
    const progress = ((currentTime - monthStart) / (nextMonthStart - monthStart)) * 100;

    return {
      progress,
      current: passedDays,
      total: totalDays,
    };
  })();

  // Year progress
  const yearProgress = (() => {
    const yearStart = new Date(now.getFullYear(), 0, 1).getTime();
    const nextYearStart = new Date(now.getFullYear() + 1, 0, 1).getTime();
    const currentTime = now.getTime();

    const passedDays = Math.floor((currentTime - yearStart) / (24 * 60 * 60 * 1000));
    const totalDays = Math.floor((nextYearStart - yearStart) / (24 * 60 * 60 * 1000));
    const progress = ((currentTime - yearStart) / (nextYearStart - yearStart)) * 100;

    return {
      progress,
      current: passedDays,
      total: totalDays,
    };
  })();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour12: false });
  };

  return (
    <div className="page-content">
      <PageHeading title="时间进度" actions={
        <>
          <Badge variant="secondary" className="text-sm tabular-nums px-3 py-1.5">
            {formatTime(now)}
          </Badge>
          <Button
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
            aria-expanded={showSettings}
            aria-controls="progress-settings"
          >
            <Settings className="h-4 w-4 mr-2" />
            设置
          </Button>
        </>
      } />

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      <div className="grid gap-4 md:grid-cols-2">
        <ProgressItem
          title="今日进度"
          value={dayProgress}
          description={`${now.toLocaleDateString('zh-CN', { weekday: 'long' })}`}
        />

        <ProgressItem
          title="工作时间进度"
          value={workProgress.progress}
          description={`${progressSettings.workStartHour}:00 - ${progressSettings.workEndHour}:00`}
          extra={
            <div className="flex justify-between">
              <span>状态: {workProgress.status}</span>
              <span>已赚: ¥{workProgress.earned.toFixed(2)}</span>
            </div>
          }
        />

        <ProgressItem
          title="本周进度"
          value={weekProgress}
        />

        <ProgressItem
          title="工作日进度"
          value={workdaysProgress}
          description={`工作日: ${progressSettings.workdays.map((d) => ['日', '一', '二', '三', '四', '五', '六'][d % 7]).join('、')}`}
        />

        <ProgressItem
          title="本月进度"
          value={monthProgress.progress}
          description={`${now.getMonth() + 1}月 (${monthProgress.current}/${monthProgress.total} 天)`}
        />

        <ProgressItem
          title="本年进度"
          value={yearProgress.progress}
          description={`${now.getFullYear()}年 (${yearProgress.current}/${yearProgress.total} 天)`}
        />
      </div>
    </div>
  );
}
