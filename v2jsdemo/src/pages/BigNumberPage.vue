<template>
    <div class="big-number-page">
        <input v-model="n1"/>
        <input v-model="n2"/>

        <div>b1r1: n1 * n2 = {{ b1r1f }} ({{ b1r1p }})</div>
        <div>b2r1: n1 * n2 = {{ b2r1f }} ({{ b2r1p }})</div>
    </div>
</template>

<script>
import Big from 'big.js'; // 第一个库
import { BigNumber } from 'bignumber.js'; //第二个库

// 严格模式，必须从字符串初始化 Big，number 类型不允许。
Big.strict = true;

export default {
    data: () => ({
        n1: "1568945632.0002356",
        n2: "123456789.123456789",
    }),
    computed: {
        b1r1p() {
            try {
                let n1 = new Big(this.n1);
                let n2 = new Big(this.n2);
                return n1.times(n2).toPrecision(4);
            } catch (e) {
                return e.toString();
            }
        },
        b1r1f() {
            try {
                let n1 = new Big(this.n1);
                let n2 = new Big(this.n2);
                return n1.times(n2).toFixed(4);
            } catch (e) {
                return e.toString();
            }
        },
        b2r1f() {
            let n1 = new BigNumber(this.n1);
            let n2 = new BigNumber(this.n2);
            return n1.times(n2).toFixed(4);
        },
        b2r1p() {
            let n1 = new BigNumber(this.n1);
            let n2 = new BigNumber(this.n2);
            return n1.times(n2).toPrecision(4);
        }
    }
}
</script>