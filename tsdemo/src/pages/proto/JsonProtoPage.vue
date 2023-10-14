<template>
    <div class="json-proto-page">

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