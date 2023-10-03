<template>
    <div class="aes-page">
        <input v-model="keyText" />
        <input v-model="sourceText" />
        <textarea :value="targetText"></textarea>
        <input :value="decryptedText"/>
    </div>
</template>

<script lang="ts">
import CryptoJS from 'crypto-js';

export default {
    data: () => ({
        keyText: "123456",
        sourceText: "",
    }),
    computed: {
        target() {
            return CryptoJS.AES.encrypt(this.sourceText, this.keyText);
        },
        targetText() {
            return this.target.toString();
        },
        decrypted() {
            return CryptoJS.AES.decrypt(this.target, this.keyText);
        },
        decryptedText() {
            return this.decrypted.toString(CryptoJS.enc.Utf8);
        },
    },
};
</script>

<style scoped>
.aes-page {
    display: flex;
    flex-direction: column;
}
</style>