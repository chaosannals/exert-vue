<template>
    <PageLayout class="image-in-browser-demo-page">
        <ElButton @click="onClickGenerate">生成</ElButton>
        <img v-if="gifTarget" :src="gifTarget"/>
    </PageLayout>
</template>

<script setup lang="ts">
// TODO 没看懂这个库怎么用，只有 10 star 网上也没找到相关资料。

import { MemoryImage, encodeGif } from 'image-in-browser';
import { ref } from 'vue';

const gifTarget = ref<string>();

const onClickGenerate = async () => {
    const root = new MemoryImage();
    for (let i = 1; i < 4; i++) {
        const response = await fetch(`/images/gif-${i}.png`);
        const buffer = await response.arrayBuffer();
        const mi = MemoryImage.fromBytes({
            bytes: buffer,
            width: 284, // 居然不会自己适配
            height: 267,
        })
        root.addFrame(mi);
    }
    const r = encodeGif({
        image: root,
    })
    const b = new Blob([r]);
    console.log(b);
    gifTarget.value = URL.createObjectURL(b);
};
</script>
