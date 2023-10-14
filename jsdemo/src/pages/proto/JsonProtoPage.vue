<template>
    <div class="json-proto-page">
        <p>Protobuf 原本应该只有 message 定义，但是因为其是为 GRPC 服务的，所以 proto 文件是有 service 定义的。只是单纯用 protobuf 做结构序列化的话，只需要写 message 就好了。</p>
        <h4>proto: </h4>
        <p>protobuf.js 特殊提供的 JSON 格式，由 pbjs 通过 proto 文件生成。</p>
        <p>{{data.protoJsonInspection}}</p>
        <h4>message: </h4>
        <p>{{ data.messageInspection }}</p>
        <h4>buffer: </h4>
        <p>{{ data.bufferInspection }}</p>
        <h4>decoded: </h4>
        <p>{{ data.decodedInspection }}</p>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import jsonProto from '../../protos/awesome.json';
import protobuf from 'protobufjs';

const root = protobuf.Root.fromJSON(jsonProto);

const data = reactive({
    protoJsonInspection: "",
    messageInspection: "",
    bufferInspection: "",
    decodedInspection: "",
});

onBeforeMount(() => {
    data.protoJsonInspection = JSON.stringify(jsonProto);

    const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

    let message = AwesomeMessage.create({ awesomeField: "hello" });
    data.messageInspection = JSON.stringify(message);
    console.log(`message = ${data.messageInspection}`);

    let buffer = AwesomeMessage.encode(message).finish();
    data.bufferInspection = Array.prototype.toString.call(buffer);
    console.log(`buffer = ${data.bufferInspection}`);

    let decoded = AwesomeMessage.decode(buffer);
    data.decodedInspection = JSON.stringify(decoded);
    console.log(`decoded = ${data.decodedInspection}`);
});
</script>

<style scoped lang="scss">
.json-proto-page {}
</style>