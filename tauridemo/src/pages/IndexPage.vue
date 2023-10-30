<template>
    <div class="index-page">
        <h1>Index</h1>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useUserStore } from '../stores/UserStore';

const user = useUserStore();

onBeforeMount(() => {
    console.log('user', user);
});

</script>

<style scoped lang="scss">
.index-page {
    overflow: hidden;
}
</style>