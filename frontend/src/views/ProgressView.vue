<script setup>
import { NProgress } from 'naive-ui';

const now = new Date();

const todayProgress = ((now.getHours() * 60 + now.getMinutes()) / (24 * 60) * 100).toFixed(2);

const weekday = now.getDay() === 0 ? 6 : now.getDay() - 1;
const weekProgress = ((weekday * 24 * 60 + now.getHours() * 60 + now.getMinutes()) / (7 * 24 * 60) * 100).toFixed(2);

let workWeekProgress = 100;
if (weekday < 5) {
  workWeekProgress = ((weekday * 24 * 60 + now.getHours() * 60 + now.getMinutes()) / (5 * 24 * 60) * 100).toFixed(2);
}

const monthProgress = ((
  now.getTime() - new Date(now.getFullYear(), now.getMonth(), 0).getTime()
) / (
    new Date(now.getFullYear(), now.getMonth() + 1, 0).getTime() - new Date(now.getFullYear(), now.getMonth(), 0).getTime()
  ) * 100
).toFixed(2);

const yearProgress = ((
  now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()
) / (
    new Date(now.getFullYear() + 1, 0, 0).getTime() - new Date(now.getFullYear(), 0, 0).getTime()
  ) * 100
).toFixed(2);


const clacStatus = (percentage) => {
  if (percentage < 60) {
    return 'success';
  } else if (percentage < 75) {
    return 'info';
  } else {
    return 'error';
  }
}
</script>

<template>
  <main>
    <h2>现在是 {{ now.toLocaleString() }}</h2>
    <h3>今日进度</h3>
    <n-progress type="line" :status="clacStatus(todayProgress)" :percentage="todayProgress"
      :indicator-placement="'inside'" processing />
    <h3>本周进度</h3>
    <n-progress type="line" :status="clacStatus(weekProgress)" :percentage="weekProgress" :indicator-placement="'inside'"
      processing />
    <h3>本周工作日进度</h3>
    <n-progress type="line" :status="clacStatus(workWeekProgress)" :percentage="workWeekProgress"
      :indicator-placement="'inside'" processing />
    <h3>本月进度</h3>
    <n-progress type="line" :status="clacStatus(monthProgress)" :percentage="monthProgress"
      :indicator-placement="'inside'" processing />
    <h3>本年进度</h3>
    <n-progress type="line" :status="clacStatus(yearProgress)" :percentage="yearProgress" :indicator-placement="'inside'"
      processing />
  </main>
</template>
