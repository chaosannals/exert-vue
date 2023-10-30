<template>
    <div class="enter-page">
        <h1>Enter</h1>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { setTimeoutAsync } from '../utils/time';
import { useRouter } from 'vue-router';

const router = useRouter();

onBeforeMount(async() => {
    await setTimeoutAsync(1000);
    router.push('index');
});

</script>

<style scoped lang="scss">
.enter-page {
    overflow: hidden;
}
</style>