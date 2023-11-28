<script setup>
import { NProgress } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useGlobalState } from '../store';

const { progressSettings } = useGlobalState()

const now = ref(new Date());

const todayProgress = ref(0);

const updateTodayProgress = () => {
  todayProgress.value = ((now.value.getHours() * 60 + now.value.getMinutes()) / (24 * 60) * 100).toFixed(2);
}
const todayWorkProgress = ref(0);
const todaySalary = ref(0);

const enableWorkProgress = progressSettings.value.workStartHour < progressSettings.value.workEndHour

const updateWorkProgress = () => {
  if (enableWorkProgress && now.value.getHours() >= progressSettings.value.workStartHour && now.value.getHours() < progressSettings.value.workEndHour) {
    todayWorkProgress.value = (
      (
        now.value.getTime() - new Date(now.value.getFullYear(), now.value.getMonth(), now.value.getDate(), progressSettings.value.workStartHour, 0, 0).getTime()
      ) / (
        new Date(now.value.getFullYear(), now.value.getMonth(), now.value.getDate(), progressSettings.value.workEndHour, 0, 0).getTime() - new Date(now.value.getFullYear(), now.value.getMonth(), now.value.getDate(), progressSettings.value.workStartHour, 0, 0).getTime()
      ) * 100
    ).toFixed(2);
    todaySalary.value = (todayWorkProgress.value * progressSettings.value.salary / 100).toFixed(2);
  } else if (enableWorkProgress && now.value.getHours() >= progressSettings.value.workEndHour) {
    todayWorkProgress.value = 100;
    todaySalary.value = (todayWorkProgress.value * progressSettings.value.salary / 100).toFixed(2);
  } else if (enableWorkProgress && now.value.getHours() < progressSettings.value.workStartHour) {
    todayWorkProgress.value = 0;
    todaySalary.value = 0;
  }
}

const weekday = now.value.getDay() === 0 ? 6 : now.value.getDay() - 1;
const weekProgress = ((weekday * 24 * 60 + now.value.getHours() * 60 + now.value.getMinutes()) / (7 * 24 * 60) * 100).toFixed(2);

let workWeekProgress = 100;
if (progressSettings.value.workdays) {
  const passedWorkdays = progressSettings.value.workdays.filter((day) => day < now.value.getDay()).length;
  const allworddays = progressSettings.value.workdays.length;
  let passedWorkdaysTime = passedWorkdays * 24 * 60;
  if (progressSettings.value.workdays.includes(now.value.getDay())) {
    passedWorkdaysTime += now.value.getHours() * 60 + now.value.getMinutes();
  }
  workWeekProgress = (passedWorkdaysTime / (allworddays * 24 * 60) * 100).toFixed(2);
} else if (weekday < 5) {
  workWeekProgress = ((weekday * 24 * 60 + now.value.getHours() * 60 + now.value.getMinutes()) / (5 * 24 * 60) * 100).toFixed(2);
}

const monthPassedDays = ((now.value.getTime() - new Date(now.value.getFullYear(), now.value.getMonth(), 0).getTime()) / (24 * 60 * 60 * 1000)).toFixed(0);
const monthTotalDays = ((new Date(now.value.getFullYear(), now.value.getMonth() + 1, 0).getTime() - new Date(now.value.getFullYear(), now.value.getMonth(), 0).getTime()) / (24 * 60 * 60 * 1000)).toFixed(0);
const monthProgress = ((
  now.value.getTime() - new Date(now.value.getFullYear(), now.value.getMonth(), 0).getTime()
) / (
    new Date(now.value.getFullYear(), now.value.getMonth() + 1, 0).getTime() - new Date(now.value.getFullYear(), now.value.getMonth(), 0).getTime()
  ) * 100
).toFixed(2);

const yearPassedDays = ((now.value.getTime() - new Date(now.value.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000)).toFixed(0);
const yearTotalDays = ((new Date(now.value.getFullYear() + 1, 0, 0).getTime() - new Date(now.value.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000)).toFixed(0);
const yearProgress = ((
  now.value.getTime() - new Date(now.value.getFullYear(), 0, 0).getTime()
) / (
    new Date(now.value.getFullYear() + 1, 0, 0).getTime() - new Date(now.value.getFullYear(), 0, 0).getTime()
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

onMounted(() => {
  updateTodayProgress();
  updateWorkProgress();
  setInterval(() => {
    now.value = new Date();
    todayProgress.value = getTodayProgress();
    updateTodayProgress();
    updateWorkProgress();
  }, 1000);
})
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
