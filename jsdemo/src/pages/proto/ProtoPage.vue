<template>
    <div class="proto-page">
        <h4>request message:</h4>
        <p>{{ data.requestMessageInspection }}</p>
        <h4>request buffer:</h4>
        <p>{{ data.requestBufferInspection }}</p>
        <h4>request decoded:</h4>
        <p>{{ data.requestDecodedInspection }}</p>

        <h4>reply message:</h4>
        <p>{{ data.replyMessageInspection }}</p>
        <h4>reply buffer:</h4>
        <p>{{ data.replyBufferInspection }}</p>
        <h4>reply decoded:</h4>
        <p>{{ data.replyDecodedInspection }}</p>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import {SayJsDemoRequest, SayJsDemoReply } from '../../protos/say';

const data = reactive({
    requestMessageInspection: "",
    requestBufferInspection: "",
    requestDecodedInspection: "",
    replyMessageInspection: "",
    replyBufferInspection: "",
    replyDecodedInspection: "",
})

onBeforeMount(() => {
    const request = SayJsDemoRequest.create({
        content: "中文内容",
    });
    data.requestMessageInspection = JSON.stringify(request);
    const requestBuffer = SayJsDemoRequest.encode(request).finish();
    data.requestBufferInspection = Array.prototype.toString.call(requestBuffer);
    const requestDecoded = SayJsDemoRequest.decode(requestBuffer);
    data.requestDecodedInspection = JSON.stringify(requestDecoded);

    const reply = SayJsDemoReply.create({
        code: 123,
        tip: "123123",
    });
    data.replyMessageInspection = JSON.stringify(reply);
    const replyBuffer = SayJsDemoReply.encode(reply).finish();
    data.replyBufferInspection = Array.prototype.toString.call(replyBuffer);
    const replyDecoded = SayJsDemoReply.decode(replyBuffer);
    data.replyDecodedInspection = JSON.stringify(replyDecoded);
});
</script>