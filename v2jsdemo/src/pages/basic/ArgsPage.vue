<template>
    <div class="args-page">
        <div v-for="it in items">
            {{ it }}
        </div>
        <args-sub-lv1 v-model="items"></args-sub-lv1>
    </div>
</template>

<script>
import ArgsSubLv1 from './ArgsSubLv1.vue';

export default {
    components: {
        ArgsSubLv1,
    },
    data: () => {
        return {
            items: ["123", "sss", "bbb"],
        };
    },
}
</script>

<style>
.args-page {
    border: 1px solid blue;
}
</style>