import { useGlobalState } from '../store'

const API_BASE = import.meta.env.VITE_API_BASE || "";
const { loading, salaryday } = useGlobalState();
import { useMessage } from 'naive-ui'
const message = useMessage();

const apiFetch = async (path, options = {}) => {
    loading.value = true;
    try {
        const response = await fetch(`${API_BASE}${path}`, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const msg = `${response.status} ${await response.text()}` || "error"
            message.error(msg);
            throw new Error(msg);
        }
        const data = await response.json();
        return data;
    } finally {
        loading.value = false;
    }
}

const getMoyuMessage = async () => {
    let path = "/api/moyu_json";
    if (salaryday.value && salaryday.value > 0 && salaryday.value <= 28) {
        path = `${path}?day=${salaryday.value}`;
    }
    return await apiFetch(path);;
}

const generateToken = async (length) => {
    let path = "/api/genereate_token";
    if (length) {
        path = `${path}?length=${length}`;
    }
    return await apiFetch(path);;
}


export const api = {
    fetch: apiFetch,
    getMoyuMessage: getMoyuMessage,
    generateToken: generateToken
}
