<script setup>
import { NMessageProvider, NGrid, NBackTop, NSpin } from 'naive-ui'
import { NGi, NSpace, NButton, NConfigProvider } from 'naive-ui'
import { darkTheme, NGlobalStyle } from 'naive-ui'
import { RouterView } from 'vue-router'
import { zhCN } from 'naive-ui'
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useGlobalState } from './store'
import { useIsMobile } from './utils/composables'
import Header from './views/Header.vue'

const { themeSwitch, loading } = useGlobalState()
const theme = computed(() => themeSwitch.value ? darkTheme : null)
useHead({
  "meta": [
    {
      "theme-color": () => themeSwitch.value ? "#18181c" : "#ffffff"
    }
  ],
})
const isMobile = useIsMobile()
</script>

<template>
  <n-config-provider :locale="zhCN" :theme="theme">
    <n-global-style />
    <n-spin description="loading..." :show="loading">
      <n-message-provider>
        <n-grid x-gap="12" :cols="12">
          <n-gi v-if="!isMobile" span="1"></n-gi>
          <n-gi :span="isMobile ? 12 : 10">
            <div class="main">
              <Header />
              <RouterView />
            </div>
          </n-gi>
          <n-gi v-if="!isMobile" span="1"></n-gi>
        </n-grid>
        <n-back-top :right="100" />
      </n-message-provider>
    </n-spin>
  </n-config-provider>
</template>


<style>
.n-button {
  margin-left: 10px;
  margin-right: 10px;
}

.n-switch {
  margin-left: 10px;
  margin-right: 10px;
}
</style>

<style scoped>
.side {
  height: 100vh;
}

.main {
  height: 100vh;
  text-align: center;
}

.n-grid {
  height: 100%;
}

.n-gi {
  height: 100%;
}

.n-space {
  height: 100%;
}
</style>
