<script setup>
import { NInputNumber, NFormItem, NSelect } from 'naive-ui'
import { useGlobalState } from '../store';

const { salaryday, progressSettings } = useGlobalState()

const workdayOptions = Array.from(
  { length: 7 },
  (_, i) => ({ label: i + 1, value: i + 1 })
);

</script>

<template>
  <main>
    <h1>摸鱼办设置</h1>
    <div style="display: inline-block;">
      <n-form-item label="发薪日" label-placement="left">
        <n-input-number v-model:value="salaryday" :min="0" :max="28" />
      </n-form-item>
      <n-form-item label="工作日" label-placement="left">
        <n-select v-model:value="progressSettings.workdays" multiple :options="workdayOptions" />
      </n-form-item>
      <n-form-item label="工作开始时间" label-placement="left">
        <n-input-number v-model:value="progressSettings.workStartHour" :min="0" :max="12" />
      </n-form-item>
      <n-form-item label="工作结束时间" label-placement="left">
        <n-input-number v-model:value="progressSettings.workEndHour" :min="0" :max="23" />
      </n-form-item>
      <n-form-item label="日薪" label-placement="left">
        <n-input-number v-model:value="progressSettings.salary" :min="0" />
      </n-form-item>
    </div>
  </main>
</template>
