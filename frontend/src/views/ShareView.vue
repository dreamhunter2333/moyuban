<script setup>
import { NRadioButton, NRadioGroup, NModal, NQrCode } from 'naive-ui';
import { NInput, NCard, NButton, useMessage } from 'naive-ui';
import useClipboard from 'vue-clipboard3'
import { useRoute } from 'vue-router'
import LZString from 'lz-string';
import MarkdownIt from 'markdown-it';
import { useIsMobile } from '../utils/composables'

import { computed, ref } from 'vue';

const message = useMessage();
const isMobile = useIsMobile()
const { toClipboard } = useClipboard()
const route = useRoute();
const md = new MarkdownIt();

const content = ref('');
const contentType = ref('markdown');
const isShared = ref(false);
const showQrcode = ref(false);

if (route.query && route.query.content && route.query.contentType) {
  contentType.value = route.query.contentType;
  try {
    content.value = LZString.decompressFromEncodedURIComponent(route.query.content);
  } catch (e) {
    message.error('解码失败: ' + e.message);
  }
  isShared.value = true;
}

const generateSharedURL = () => {
  const compressedContent = LZString.compressToEncodedURIComponent(content.value);
  return `${window.location.origin}/share`
    + `?contentType=${contentType.value}`
    + `&content=${compressedContent}`
}

const share = async () => {
  try {
    toClipboard(generateSharedURL());
    message.success('URL 已复制到剪贴板');
  } catch (e) {
    message.error('编码失败: ' + e.message);
  }
};

const markdownRender = (content) => {
  if (!content) {
    return '';
  }
  try {
    return md.render(content);
  } catch (e) {
    message.error('Markdown 渲染失败: ' + e.message);
  }
};

// computed from sreen width
const qrCodeSize = computed(() => {
  const width = window.innerWidth;
  return 100 * Math.min(3, Math.max(1, Math.floor(width / 200)));
})
</script>

<template>
  <main>
    <h2>一个简单的在线分享工具, 支持文本、Html、Markdown</h2>
    <p>注意：没有保存功能, 只有复制链接或者扫描二维码获得链接才能查看或编辑之前的内容</p>
    <n-button v-if="isShared" type="primary" @click="isShared = false" ghost>编辑</n-button>
    <n-button v-else type="primary" @click="isShared = true" ghost>预览</n-button>
    <n-radio-group v-model:value="contentType" :disabled="isShared">
      <n-radio-button value="text" label="文本" />
      <n-radio-button value="html" label="Html" />
      <n-radio-button value="markdown" label="Markdown" />
    </n-radio-group>
    <n-button type="primary" @click="share" ghost>复制分享链接</n-button>
    <n-button type="primary" @click="showQrcode = true" ghost>查看分享二维码</n-button>
    <n-modal v-model:show="showQrcode" preset="dialog">
      <n-card title="二维码" style="text-align: center;">
        <n-qr-code :value="generateSharedURL()" :size="qrCodeSize" />
      </n-card>
    </n-modal>
    <div v-if="isShared">
      <n-card>
        <n-input v-if="contentType == 'text'" v-model:value="content" type="textarea" :autosize="{ minRows: 10 }"
          readonly />
        <div class="left" v-else-if="contentType == 'html'" v-html="content"></div>
        <div class="left" v-else-if="contentType == 'markdown'" v-html="markdownRender(content)"></div>
      </n-card>
    </div>
    <div v-else>
      <n-input v-model:value="content" type="textarea" :autosize="{ minRows: 10 }" />
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
