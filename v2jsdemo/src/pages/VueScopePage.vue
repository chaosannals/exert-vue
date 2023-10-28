<template>
    <div class="vue-scope-page">
        <button @click="onClick1">1</button>
        <button @click="onClick2">2</button>
        <div v-show="visiable">111</div>
    </div>
</template>

<script>
export default {
    data: () => ({

    }),
    created() {
        this.visiable = true;
    },
    methods: {
        onClick1() {
            this.aaa = 1;
            this.timerId = setTimeout(() => {
                console.log(this.aaa, 'timeout');
            }, 4000);
            console.log('onClick1', this, this.aaa);
        },

        onClick2() {
            if (this.timerId) {
                console.log('timer', this.timerId);
                clearTimeout(this.timerId);
            }
            console.log('onClick2', this, this.aaa);
        }
    }
}
</script>

