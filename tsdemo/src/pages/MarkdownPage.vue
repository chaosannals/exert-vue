<template>
    <div class="markdown-page">
        <div class="markdown-content" v-html="data.helloWorldCode"></div>
    </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { onBeforeMount, reactive } from 'vue';

const data = reactive({
    helloWorldCode: "",
});

const readText = async (url: string) => {
    const response = await fetch(url);
    return await response.text();
};

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    })
);

onBeforeMount(async () => {
    const text = await readText("/code/hello_world.md");
    data.helloWorldCode = await marked.parse(text);
});
</script>

<style scoped lang="scss">
.markdown-page {
    .markdown-content {
        padding: 1vw;
        background-color: #f4f4f4;
        text-align: left;
    }
}
</style>