<script setup>
import { NGrid, NLayoutHeader, NSwitch, NButton, NMenu, NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { h } from 'vue'
import { useGlobalState } from '../store'
import { useIsMobile } from '../utils/composables'
import { DarkModeFilled, DarkModeOutlined, StarOutlineFilled, MenuFilled } from '@vicons/material'

const { themeSwitch } = useGlobalState()

const menuOptions = [
    {
        label: () => h(
            RouterLink,
            {
                to: "/"
            },
            { default: () => "首页" }
        ),
        key: "home"
    },
    {
        label: () => h(
            RouterLink,
            {
                to: "/tools"
            },
            { default: () => "工具" }
        ),
        key: "tools",
        children: [
            {
                label: () => h(
                    RouterLink,
                    {
                        to: "/tools"
                    },
                    { default: () => "工具" }
                ),
                key: "tools",
            },
            {
                label: () => h(
                    RouterLink,
                    {
                        to: "/share"
                    },
                    { default: () => "分享" }
                ),
                key: "share",
            }
        ]
    },
    {
        label: () => h(
            RouterLink,
            {
                to: "/progress"
            },
            { default: () => "进度" }
        ),
        key: "progress"
    },
    {
        label: () => h(
            RouterLink,
            {
                to: "/settings"
            },
            { default: () => "设置" }
        ),
        key: "settings"
    },
    {
        label: () => h(
            RouterLink,
            {
                to: "/about"
            },
            { default: () => "关于" }
        ),
        key: "about"
    }
];

const isMobile = useIsMobile()

const menuOptionsMobile = [
    {
        label: "菜单",
        icon: () => h(
            NIcon,
            {
                component: MenuFilled
            }
        ),
        key: "menu",
        children: menuOptions
    },
]

</script>

<template>
    <n-layout-header>
        <div v-if="!isMobile">
            <h2 style="display: inline-block; margin-left: 10px;">摸鱼办</h2>
        </div>
        <div>
            <n-menu v-if="!isMobile" mode="horizontal" :options="menuOptions" />
            <n-menu v-else mode="horizontal" :options="menuOptionsMobile" />
        </div>
        <div>
            <n-switch v-model:value="themeSwitch" :size="isMobile ? 'small' : 'medium'">
                <template #checked-icon>
                    <n-icon :component="DarkModeFilled" />
                </template>
                <template #unchecked-icon>
                    <n-icon :component="DarkModeOutlined" />
                </template>
            </n-switch>
            <n-button tag="a" target="_blank" tertiary type="primary" round :size="isMobile ? 'small' : 'medium'"
                href="https://github.com/dreamhunter2333/moyuban">
                <n-icon :component="StarOutlineFilled" /> Github
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
