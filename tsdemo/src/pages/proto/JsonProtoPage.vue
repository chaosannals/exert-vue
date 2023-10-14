<template>
    <div class="json-proto-page">
        <p>pbjs 通过 proto 文件生成 js 文件。</p>
        <p>pbts 通过 js 生成 .d.ts 文件的类型定义。</p>
        <p>pbjs 可以通过 proto 生成 json 文件，更方便，但是种适合 js 开发，ts 会缺少类型。</p>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import jsonProto from '../../protos/awesome.json';
import protobuf from 'protobufjs';

const root = protobuf.Root.fromJSON(jsonProto as protobuf.INamespace);

onBeforeMount(() => {
    console.log('pb', (root  as any).SayJsDemoReply);
});

</script>

<style scoped lang="scss">
.json-proto-page {

}
</style>