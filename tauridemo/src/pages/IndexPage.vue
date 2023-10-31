<template>
    <div class="index-page">
        <h1>Index: {{ user.token }}</h1>
        <div class="link-box">
            <div v-for="link in links" class="link-item">
                <RouterLink :to="link">{{ link }}</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { routes } from '../router';

const user = useUserStore();

const links = computed(() => {
    return routes.map(i => i.path);
});

onBeforeMount(() => {
    
});

</script>

<style scoped lang="scss">
.index-page {
    overflow: hidden;
}
</style>