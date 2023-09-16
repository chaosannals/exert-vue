<template>
    <div class="args-sub-lv1">
        <div v-for="it in value">
            {{ it }}
        </div>
        <div @click="onClickAdd">
            添加
        </div>
        <args-sub-lv2 v-model="items"></args-sub-lv2>
    </div>
</template>

<script>
import ArgsSubLv2 from './ArgsSubLv2.vue';

export default {
    components: {
        ArgsSubLv2
    },
    data: () => {
        return {};
    },
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
        }
    },
};
</script>

<style scoped>
.args-sub-lv1 {
    border: 1px solid red;
}
</style>