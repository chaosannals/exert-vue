<template>
    <PageLayout class="gif-js-demo-page">
        <ElButton @click="onClickGenerate">生成</ElButton>
        <img v-if="gifTarget" alt="gif" :src="gifTarget" />
    </PageLayout>
</template>

<script setup lang="ts">
import GIF from 'gif.js';

// 直接加载成字符串 居然不是 string 类型声明，会缺少声明。
//@ts-ignore
// import gifWorker from 'gif.js/dist/gif.worker?raw';

// 直接 vite 提供 URL，效率更高，同样的问题 TS 缺少类型声明，不是 string 。
// vite-env.d.ts 定义了声明。
import gifWorkerUrl from 'gif.js/dist/gif.worker?url';
import { ref } from 'vue';

type ImageType = CanvasImageSource | CanvasRenderingContext2D | WebGLRenderingContext | ImageData;

// 直接加载成字符串 再转成 URL
// const getGifWorkerUrl = (): string => {
//     const blob = new Blob([gifWorker]);
//     return URL.createObjectURL(blob);
// }

const generateGif = async (images: ImageType[]): Promise<string> => {
    console.log(gifWorkerUrl);
    return new Promise((resolve) => {
        const gif = new GIF({
            workers: 2,
            quality: 10,
            // workerScript: getGifWorkerUrl(),
            workerScript: gifWorkerUrl,
        });
        for (const image of images) {
            gif.addFrame(image, { delay: 400, copy: false });
        }
        gif.on('finished', (b) => {
            resolve(URL.createObjectURL(b));
        });
        gif.render();
    });
}

const gifTarget = ref<string>();

const loadImage = async (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = document.createElement('img');
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', (e) => {
            reject(e);
        });
        image.src = src;
    });
}

const onClickGenerate = async () => {
    const tasks: Promise<HTMLImageElement>[] = [];
    for (let i = 1; i < 4; i++) {
        const image = loadImage(`/images/gif-${i}.png`);
        tasks.push(image);
    }
    
    // 这个库是早期库，没有等待图片加载完成，所以需要自己做图片加载完成的操作。不然会是黑的。
    const images = await Promise.all(tasks);
    gifTarget.value = await generateGif(images);
};
</script>