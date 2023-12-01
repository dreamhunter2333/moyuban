<script setup>
import { NRadioButton, NRadioGroup } from 'naive-ui';
import { NInput, NCard, NButton, useMessage } from 'naive-ui';
import useClipboard from 'vue-clipboard3'
import { useRoute } from 'vue-router'
import { Base64 } from 'js-base64';
import MarkdownIt from 'markdown-it';

import { ref } from 'vue';

const message = useMessage();
const { toClipboard } = useClipboard()
const route = useRoute();
const md = new MarkdownIt();

const content = ref('');
const contentType = ref('markdown');
const isShared = ref(false);

if (route.query && route.query.content && route.query.contentType) {
  contentType.value = route.query.contentType;
  try {
    content.value = Base64.decode(route.query.content);
  } catch (e) {
    message.error('Base64 解码失败: ' + e.message);
  }
  isShared.value = true;
}

const share = async () => {
  try {
    const base64Str = Base64.encode(content.value);
    toClipboard(`${window.location.origin}/share?content=${base64Str}&contentType=${contentType.value}`)
    message.success('URL 已复制到剪贴板');
  } catch (e) {
    message.error('Base64 编码失败: ' + e.message);
  }
};
</script>

<template>
  <main>
    <h2>分享 - 一个简单的在线分享工具</h2>
    <n-button v-if="isShared" type="primary" @click="isShared = false" ghost>编辑</n-button>
    <n-button v-else type="primary" @click="isShared = true" ghost>预览</n-button>
    <n-radio-group v-model:value="contentType" :disabled="isShared">
      <n-radio-button value="text" label="文本" />
      <n-radio-button value="html" label="Html" />
      <n-radio-button value="markdown" label="Markdown" />
    </n-radio-group>
    <n-button type="primary" @click="share" ghost>复制分享链接</n-button>
    <div v-if="isShared">
      <n-card>
        <n-input v-if="contentType == 'text'" v-model:value="content" type="textarea" :autosize="{
          minRows: 10
        }" readonly />
        <div class="left" v-else-if="contentType == 'html'" v-html="content"></div>
        <div class="left" v-else-if="contentType == 'markdown'" v-html="md.render(content)"></div>
      </n-card>
    </div>
    <div v-else>
      <n-input v-model:value="content" type="textarea" :autosize="{
        minRows: 10
      }" />
    </div>
  </main>
</template>

<style scoped>
.n-input {
  margin-top: 10px;
  text-align: left;
}

.left {
  margin-top: 10px;
  text-align: left;
}
</style>
