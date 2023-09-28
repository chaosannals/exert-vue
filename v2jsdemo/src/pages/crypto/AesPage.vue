<template>
    <div class="aes-page">
        <input type="file" @input="onLoadFile" />
        <input type="text" v-model="resultMd5Hex" />
        <input type="text" v-model="resultMd5Base64" />
    </div>
</template>

<script>
import md5 from 'crypto-js/md5';
import Hex from 'crypto-js/enc-hex';
import Base64 from 'crypto-js/enc-base64';
import { readAsArrayBuffer } from '../../utils/io';

export default {
    data: () => ({
        resultMd5Hex: "",
        resultMd5Base64: "",
    }),
    methods: {
        async onLoadFile(e) {
            console.log(e);
            let file = e.target.files[0];
            let buffer = await readAsArrayBuffer(file);
            let result = md5(buffer);
            this.resultMd5Base64 = Base64.stringify(result);
            this.resultMd5Hex = Hex.stringify(result);
        }
    }
}
</script>