<template>
    <div class="file-md5-page">
        <input type="file" @input="onLoadFile" />
        <div>size: {{ fileSize }}</div>
        <div>buffer size: {{ bufferSize }}</div>
        <textarea v-model="resultMd5Hex" rows="4"></textarea>
        <textarea v-model="resultMd5Base64" rows="4"></textarea>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import Hex from 'crypto-js/enc-hex';
import Base64 from 'crypto-js/enc-base64';
import md5 from 'crypto-js/md5';
import { readAsArrayBuffer } from '../../utils/io';

export default {
    data: () => ({
        fileSize: 0,
        bufferSize: 0,
        resultMd5Hex: "",
        resultMd5Base64: "",
    }),
    methods: {
        async onLoadFile(e) {
            console.log('event', e);
            let file = e.target.files[0];
            let buffer = await readAsArrayBuffer(file);
            this.fileSize = file.size;
            this.bufferSize = buffer.byteLength;
            let result = md5(CryptoJS.lib.WordArray.create(buffer));
            this.resultMd5Base64 = Base64.stringify(result);
            this.resultMd5Hex = Hex.stringify(result);
        }
    }
}
</script>