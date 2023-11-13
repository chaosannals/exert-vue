import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('common', () => {
    const version = ref("1.0.0");
    const token = ref("");

    return {
        version,
        token,
    };
}, {
    persist: true,
});