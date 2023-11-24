import { ref } from "vue";
import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
    () => {
        const loading = ref(false);
        const themeSwitch = useStorage('themeSwitch', false);
        const salaryday = useStorage('salaryday', 0);
        const defaultTool = useStorage('defaultTool', "");
        const progressSettings = useStorage('progressSettings', {
            workdays: [1, 2, 3, 4, 5],
            workStartHour: 0,
            workEndHour: 0,
            salary: 0,
        });
        return {
            loading,
            themeSwitch,
            salaryday,
            defaultTool,
            progressSettings
        }
    },
)
