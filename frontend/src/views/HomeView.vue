<script setup>
import { NCard } from 'naive-ui';
import { onMounted, ref } from 'vue';
import MarkdownIt from 'markdown-it';

import { api } from '../api';

const md = new MarkdownIt();
const result = ref('');

onMounted(async () => {
  const res = await api.getMoyuMessage();
  console.log(res);
  result.value = md.render(res);
  console.log(result.value);
});
</script>

<template>
  <main>
    <n-card>
      <div class="result" v-html="result"></div>
    </n-card>
  </main>
</template>

<style scoped>
.result {
  text-align: left;
}
</style>
