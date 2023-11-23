<script setup>
import { NGrid, NLayoutHeader, NSwitch, NButton } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { useGlobalState } from '../store'

const router = useRouter();
const route = useRoute();
const { themeSwitch } = useGlobalState()
</script>

<template>
    <n-layout-header>
        <div>
            <h2 style="display: inline-block">摸鱼办</h2>
            <n-button @click="router.push('/')" quaternary>首页</n-button>
            <n-button @click="router.push('/tools')" quaternary>工具</n-button>
            <n-button @click="router.push('/settings')" quaternary>设置</n-button>
            <n-button @click="router.push('/about')" quaternary>关于</n-button>
        </div>
        <div>
            <n-switch v-model:value="themeSwitch">
                <template #checked>
                    暗
                </template>
                <template #unchecked>
                    亮
                </template>
            </n-switch>
            <n-button tag="a" target="_blank" tertiary type="primary" round
                href="https://github.com/dreamhunter2333/moyuban">Star on Github
            </n-button>
        </div>
    </n-layout-header>
</template>

<style scoped>
.n-layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
