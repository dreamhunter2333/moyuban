<script setup>
import { NInputNumber, NFormItem } from 'naive-ui'
import { useGlobalState } from '../store';

const { salaryday } = useGlobalState()
</script>

<template>
  <main>
    <h1>摸鱼办设置</h1>
    <div style="display: inline-block;">
      <n-form-item label="发薪日" label-placement="left">
        <n-input-number v-model:value="salaryday" :min="0" :max="28" />
      </n-form-item>
    </div>
  </main>
</template>
