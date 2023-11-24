<template>
    <PageLayout class="toy-countdown-page">
        <ElButton @click="onClick">剩余时间 {{ data.time }}</ElButton>
    </PageLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { countdown } from '../../utils/async';

const data = reactive({
    time: 0,
});

const onClick = async () => {
    await countdown((t) => { data.time = t; }, 10 * 1000);
};
</script>