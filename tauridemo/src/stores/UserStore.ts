import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useUserStore = defineStore('user', {
    state: () => {
        const state = reactive({});
        const token = ref("");
        return {
            state,
            token,
        };
    },
    actions: {
        saveToken(token: string) {
            console.log('saveToken', token);
            this.token = token;
        }
    },
    persist: true,
});