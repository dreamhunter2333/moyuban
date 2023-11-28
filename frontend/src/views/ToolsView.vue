<script setup>
import { NCollapse, NCollapseItem, NInputGroup, NInputGroupLabel } from 'naive-ui';
import { NInput, NInputNumber, NButton, useMessage } from 'naive-ui';
import useClipboard from 'vue-clipboard3'

import { ref } from 'vue';

import { api } from '../api';
import { useGlobalState } from '../store';

const message = useMessage();
const { toClipboard } = useClipboard()

const { defaultTool } = useGlobalState()

const updateDefaultTool = (expandedNames) => {
  defaultTool.value = expandedNames;
}

// 密码生成
const length = ref(16);
const token = ref('');

// URL encode/decode
const url = ref('');
// Base64 encode/decode
const base64Str = ref('');

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

const encodeBase64 = async () => {
  try {
    base64Str.value = btoa(base64Str.value);
    message.success('Base64 编码成功');
  } catch (e) {
    message.error('Base64 编码失败: ' + e.message);
  }
};

const decodeBase64 = async () => {
  try {
    base64Str.value = atob(base64Str.value);
    message.success('Base64 解码成功');
  } catch (e) {
    message.error('Base64 解码失败: ' + e.message);
  }
};
</script>

<template>
  <main>
    <h1>工具</h1>
    <n-collapse :default-expanded-names="defaultTool" accordion :on-update:expanded-names="updateDefaultTool">
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
        <n-input v-model:value="url" type="textarea" :autosize="{
          minRows: 2
        }" />
        <n-button type="primary" @click="url = encodeURI(url)" ghost>encode</n-button>
        <n-button type="primary" @click="url = decodeURI(url)" ghost>decode</n-button>
      </n-collapse-item>
      <n-collapse-item title="Base64 encode/decode" name="3">
        <n-input v-model:value="base64Str" type="textarea" :autosize="{
          minRows: 2
        }" />
        <n-button type="primary" @click="encodeBase64" ghost>encode</n-button>
        <n-button type="primary" @click="decodeBase64" ghost>decode</n-button>
      </n-collapse-item>
    </n-collapse>
  </main>
</template>

<style scoped>
.n-input-group {
  margin-bottom: 10px;
}
</style>
