<script setup>
import { NCollapse, NCollapseItem, NInputGroup, NInputGroupLabel } from 'naive-ui';
import { NInput, NInputNumber, NButton, useMessage } from 'naive-ui';
import useClipboard from 'vue-clipboard3'

import { ref } from 'vue';

import { api } from '../api';

const message = useMessage();
const { toClipboard } = useClipboard()

const length = ref(16);
const token = ref('');

const copyToken = async () => {
  try {
    await toClipboard(token.value)
    message.success('复制成功');
  } catch (e) {
    message.error(e.message || "复制失败");
  }
}

const generateToken = async () => {
  token.value = await api.generateToken(length.value);
};
</script>

<template>
  <main>
    <h1>工具</h1>
    <n-collapse>
      <n-collapse-item title="密码生成" name="1">
        <div style="display: inline-block;">
          <n-input-group>
            <n-input-group-label>长度</n-input-group-label>
            <n-input-number v-model:value="length" :min="1" :max="100" />
            <n-button @click="generateToken" type="primary">生成</n-button>
          </n-input-group>
          <br />
          <n-input-group>
            <n-input v-model:value="token" disabled />
            <n-button type="primary" @click="copyToken" ghost>复制</n-button>
          </n-input-group>
        </div>
      </n-collapse-item>
      <n-collapse-item title="URL encode/decode" name="2">
        <div>测试</div>
      </n-collapse-item>
    </n-collapse>
  </main>
</template>

<style scoped>
.n-input-group {
  margin-bottom: 10px;
}
</style>
