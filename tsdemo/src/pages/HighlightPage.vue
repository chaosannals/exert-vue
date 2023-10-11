<template>
    <div class="highlight-page">
        <!-- 由于 pre code span 都是行内元素 所以换行会影响到布局，所以要写成单行。 -->
        <pre class="code-block"><code><span v-html="data.jsCode"></span></code></pre>
        <pre class="code-block"><code><span v-html="data.cppCode"></span></code></pre>
        <pre class="code-block"><code><span v-html="data.markdownCode"></span></code></pre>
        <pre class="code-block"><code><span v-html="data.myCode"></span></code></pre>
    </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import { onBeforeMount, reactive } from 'vue';

const data = reactive({
    jsCode: "",
    cppCode: "",
    markdownCode: "",
    myCode: "",
});

const readText = async (url: string) => {
    const response = await fetch(url);
    return await response.text();
};

onBeforeMount(async () => {
    const jsCode = await readText("/code/hello_world.js");
    const cppCode = await readText("/code/hello_world.cpp");
    const markdownCode = await readText("/code/hello_world.md");
    const myCode = await readText("/code/hello_world.my");
    data.jsCode = hljs.highlightAuto(jsCode).value;
    data.cppCode = hljs.highlightAuto(cppCode).value;
    data.markdownCode = hljs.highlightAuto(markdownCode).value;
    data.myCode = hljs.highlight(myCode, { language: 'mylang' }).value;
});

</script>

<style scoped lang="scss">
.highlight-page {
    .code-block {
        display: block;
        text-align: left;
        margin: 1vw;
        padding: 1vw;
        background: #f4f4f4;
    }
}
</style>