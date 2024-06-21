<script setup>
import {
    NPageHeader, NLayoutHeader, NButton, NMenu, NIcon,
    NAvatar, NSpace, NFlex
} from 'naive-ui'
import { RouterLink } from 'vue-router'
import { h } from 'vue'
import { useGlobalState } from '../store'
import { useIsMobile } from '../utils/composables'
import { DarkModeFilled, LightModeFilled, MenuFilled } from '@vicons/material'
import { GithubAlt } from '@vicons/fa'

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
        label: () => h("h3", "菜单"),
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
        <n-page-header>
            <template #title>
                <n-space v-if="!isMobile" style="align-items: center;">
                    <h3>摸鱼办</h3>
                    <n-menu mode="horizontal" :options="menuOptions" responsive />
                </n-space>
                <n-space v-else style="align-items: center;">
                    <n-menu mode="horizontal" :options="menuOptionsMobile" />
                </n-space>
            </template>
            <template #avatar v-if="!isMobile">
                <n-avatar style="margin-left: 10px;" src="/images/pwa-192x192.png" />
            </template>
            <template #extra>
                <n-flex justify="end">
                    <n-button v-model:value="themeSwitch" text @click="themeSwitch = !themeSwitch">
                        <template #icon>
                            <n-icon :component="themeSwitch ? LightModeFilled : DarkModeFilled" />
                        </template>
                    </n-button>
                    <n-button tag="a" target="_blank" tertiary type="primary" round
                        :size="isMobile ? 'small' : 'medium'" href="https://github.com/dreamhunter2333/moyuban">
                        <template #icon>
                            <n-icon :component="GithubAlt" />
                        </template>
                    </n-button>
                </n-flex>
            </template>
        </n-page-header>
    </n-layout-header>
</template>
