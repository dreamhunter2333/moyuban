<script setup>
import { NProgress } from 'naive-ui';
import { useGlobalState } from '../store';

const { progressSettings } = useGlobalState()

const now = new Date();

const todayProgress = ((now.getHours() * 60 + now.getMinutes()) / (24 * 60) * 100).toFixed(2);


let todayWorkProgress = 0;
let todaySalary = 0;
const enableWorkProgress = progressSettings.value.workStartHour < progressSettings.value.workEndHour
if (enableWorkProgress && now.getHours() >= progressSettings.value.workStartHour && now.getHours() < progressSettings.value.workEndHour) {
  todayWorkProgress = (
    (
      now.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate(), progressSettings.value.workStartHour, 0, 0).getTime()
    ) / (
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), progressSettings.value.workEndHour, 0, 0).getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate(), progressSettings.value.workStartHour, 0, 0).getTime()
    ) * 100
  ).toFixed(2);
  todaySalary = (todayWorkProgress * progressSettings.value.salary / 100).toFixed(2);
} else if (enableWorkProgress && now.getHours() >= progressSettings.value.workEndHour) {
  todayWorkProgress = 100;
  todaySalary = (todayWorkProgress * progressSettings.value.salary / 100).toFixed(2);
} else if (enableWorkProgress && now.getHours() < progressSettings.value.workStartHour) {
  todayWorkProgress = 0;
  todaySalary = 0;
}

const weekday = now.getDay() === 0 ? 6 : now.getDay() - 1;
const weekProgress = ((weekday * 24 * 60 + now.getHours() * 60 + now.getMinutes()) / (7 * 24 * 60) * 100).toFixed(2);

let workWeekProgress = 100;
if (progressSettings.value.workdays) {
  const passedWorkdays = progressSettings.value.workdays.filter((day) => day < now.getDay()).length;
  const allworddays = progressSettings.value.workdays.length;
  let passedWorkdaysTime = passedWorkdays * 24 * 60;
  if (progressSettings.value.workdays.includes(now.getDay())) {
    passedWorkdaysTime += now.getHours() * 60 + now.getMinutes();
  }
  workWeekProgress = (passedWorkdaysTime / (allworddays * 24 * 60) * 100).toFixed(2);
} else if (weekday < 5) {
  workWeekProgress = ((weekday * 24 * 60 + now.getHours() * 60 + now.getMinutes()) / (5 * 24 * 60) * 100).toFixed(2);
}

const monthPassedDays = ((now.getTime() - new Date(now.getFullYear(), now.getMonth(), 0).getTime()) / (24 * 60 * 60 * 1000)).toFixed(0);
const monthTotalDays = ((new Date(now.getFullYear(), now.getMonth() + 1, 0).getTime() - new Date(now.getFullYear(), now.getMonth(), 0).getTime()) / (24 * 60 * 60 * 1000)).toFixed(0);
const monthProgress = ((
  now.getTime() - new Date(now.getFullYear(), now.getMonth(), 0).getTime()
) / (
    new Date(now.getFullYear(), now.getMonth() + 1, 0).getTime() - new Date(now.getFullYear(), now.getMonth(), 0).getTime()
  ) * 100
).toFixed(2);

const yearPassedDays = ((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000)).toFixed(0);
const yearTotalDays = ((new Date(now.getFullYear() + 1, 0, 0).getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000)).toFixed(0);
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
    <h2 v-if="todaySalary > 0">今日已赚 {{ todaySalary }}</h2>
    <h3 v-if="todayWorkProgress">今日工作时间进度</h3>
    <n-progress v-if="todayWorkProgress" type="line" :status="clacStatus(todayWorkProgress)"
      :percentage="todayWorkProgress" :indicator-placement="'inside'" />
    <h3>今日进度</h3>
    <n-progress type="line" :status="clacStatus(todayProgress)" :percentage="todayProgress"
      :indicator-placement="'inside'" />
    <h3>本周进度</h3>
    <n-progress type="line" :status="clacStatus(weekProgress)" :percentage="weekProgress"
      :indicator-placement="'inside'" />
    <h3>本周工作日进度</h3>
    <n-progress type="line" :status="clacStatus(workWeekProgress)" :percentage="workWeekProgress"
      :indicator-placement="'inside'" />
    <h3>本月进度 {{ monthPassedDays }}/{{ monthTotalDays }} 天</h3>
    <n-progress type="line" :status="clacStatus(monthProgress)" :percentage="monthProgress"
      :indicator-placement="'inside'" />
    <h3>本年进度 {{ yearPassedDays }}/{{ yearTotalDays }} 天</h3>
    <n-progress type="line" :status="clacStatus(yearProgress)" :percentage="yearProgress"
      :indicator-placement="'inside'" />
  </main>
</template>
