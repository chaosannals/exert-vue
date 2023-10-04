<template>
    <div class="rsa-page">
        <div>私钥</div>
        <p>openssl genrsa -out rsa_1024_priv.pem 1024</p>
        <textarea v-model="data.privText" rows="10"></textarea>
        <div>公钥</div>
        <p>openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem</p>
        <textarea v-model="data.pubText" rows="10"></textarea>
        <div>原始文本：</div>
        <textarea v-model="data.sourceText"></textarea>
        <div>加密文本</div>
        <textarea v-model="data.targetText"></textarea>
        <div>解密文本</div>
        <textarea v-model="data.originText"></textarea>
        <button @click="onClickRun">执行</button>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import JSEncrypt from 'jsencrypt';

// 无效
// import privText from '../../assets/ras_1024_priv.txt?raw';
// import pubText from '../../assets/ras_1024_pub.pem?raw';

const readText = async (url: string) => {
    const response = await fetch(url);
    return await response.text();
};

const data = reactive({
    privText: "",
    pubText: "",
    sourceText: "",
    targetText: "",
    originText: "",
});

onBeforeMount(async () => {
    data.privText = await readText('/rsa_1024_priv.pem');
    data.pubText = await readText('/rsa_1024_pub.pem');
});

const onClickRun = () => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(data.pubText);
    const eResult = encrypt.encrypt(data.sourceText);
    if (eResult !== false) {
        data.targetText = eResult;
        
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(data.privText);
        const dResult = decrypt.decrypt(data.targetText);
        if (dResult !== false) {
            data.originText = dResult;
        }
    }
}
</script>