<template>
    <div class="computed-page">
        <div v-for="item in ca">
            <div>{{ item }}</div>
        </div>
        <button @click="onClick">按下</button>
    </div>
</template>

<script>
/**
 * ca  和  a  不是直接关联而是调用了 fa 
 * 即便如此，vue 也是能供由 a 的变化而触发改变 ca 
 */
export default {
    data: () => ({
        a: [1],
    }),
    computed: {
        ca() { return this.fa(123); }
    },
    methods: {
        fa(t) {
            return this.a.concat(t);
        },
        onClick() {
            this.a.push(this.a.length);
        }
    }
}
</script>