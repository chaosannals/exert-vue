<template>
    <div class="args-sub-lv2">
        <div v-for="it in value">
            {{ it }}
        </div>
        <div @click="onClickAdd">
            添加
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Array[String],
            default: () => ([]),
        },
    },
    computed: {
        items: {
            get() {
                return this.value;
            },
            set(v) {
                this.$emit('input', v);
            }
        }
    },
    methods: {
        onClickAdd() {
            this.items.push("123");
        },
    },
};
</script>

<style scoped>
.args-sub-lv2 {
    border: 1px solid green;
}
</style>