import { ref } from "vue";
import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
    () => {
        const loading = ref(false);
        const themeSwitch = useStorage('themeSwitch', false);
        const salaryday = useStorage('salaryday', 0);
        const defaultTool = useStorage('defaultTool', "");
        return {
            loading,
            themeSwitch,
            salaryday,
            defaultTool
        }
    },
)
