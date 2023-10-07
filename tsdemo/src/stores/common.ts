import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('common', () => {
    const version = ref("1.0.0");

    return {
        version,
    };
}, {
    persist: true,
});