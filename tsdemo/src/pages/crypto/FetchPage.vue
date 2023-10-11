<template>
    <div class="fetch-page">
        <pre class="code-block"><code><span v-html="data.head"></span></code></pre>
    </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import Utf8 from 'crypto-js/enc-utf8';
import WordArray from 'crypto-js/lib-typedarrays';
import { onBeforeMount, reactive } from 'vue';


async function fetchHead(url: string, length: number): Promise<Uint8Array> {
    const response = await fetch(url);
    const reader = response.body?.getReader();
    const buffer = new Uint8Array(length);
    let index = 0;
    while (reader != null && index < length) {
        const { done, value } = await reader.read();
        if (done) break;
        for (let i = 0; (i < value.length) && (index < length); ++i) {
            // console.log('fetchHead 0', index, length);
            buffer[index++] = value[i];
        }
    }
    await reader?.cancel();

    // 最后一步 index++ 可能会使得 index == length
    if (index >= length) {
        index = length - 1;
    }

    // UTF8 截取后末尾可能是不完整字符
    let c = buffer[index];
    // 排除以 10xxxxxx 后半字符
    while ((c & 0b11000000) == 0b10000000 && (index > 0)) {
        c = buffer[--index];
    }
    // 排除前半字符 1+0*
    if (c >= 0b11000000 && (index > 0)) {
        --index;
    }
    // 需要再 new 一个 Uint8Array ，不然共用一个 ArrayBuffer, 而 ArrayBuffer 还是原先的长度，外面要取的是 ArrayBuffer。
    return (index + 1) < length ? new Uint8Array(buffer.subarray(0, index + 1)) : buffer;
}

const data = reactive({
    head: "",
});

onBeforeMount(async () => {
    const bytes = await fetchHead('/code/hello_world.md', 102);
    //@ts-ignore
    const words = WordArray.create(bytes.buffer); // 直接取到的 buffer 长度和本身不一样。
    // console.log('bytes words', bytes, words);
    const head = Utf8.stringify(words);
    // console.log('head', head);
    data.head = hljs.highlightAuto(head).value;
});

</script>

<style scoped lang="scss">
.fetch-page {
    .code-block {
        display: block;
        text-align: left;
        margin: 1vw;
        padding: 1vw;
        background: #f4f4f4;
    }
}
</style>