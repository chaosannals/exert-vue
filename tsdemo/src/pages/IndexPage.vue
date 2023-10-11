<template>
    <div class="index-page">
        <div v-for="link in links" @click="onClickLink(link)">
            <span>{{ link }}</span>
        </div>
        <div v-for="f in data.files">
            <span>{{ f }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { routes } from '../router';
import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';

const data = reactive({
    files: __STATIC_FILES__, // 因为是预定义的变量，无法在 template 里面直接使用，所以这里赋值给 files
});

const $router = useRouter();
const links = computed(() => {
    return routes.map(i => i.path);
});
const onClickLink = (link: string) => {
    $router.push(link);
};

</script>