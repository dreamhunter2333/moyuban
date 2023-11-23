<script setup>
import { NCard } from 'naive-ui';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
const about = md.render(`# 关于摸鱼办`);
</script>

<template>
  <main>
    <n-card>
      <div class="result" v-html="about"></div>
    </n-card>
  </main>
</template>
