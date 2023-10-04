<template>
    <div class="index-page">
        <div v-for="link in links" @click="onClickLink(link)">
            <span>{{ link }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { routes } from '../router';
import { useRouter } from 'vue-router';
// import router from '../router'; // 此句和 useRouter 一样，不过按照惯例，使用 useRouter 。

const data = reactive({});
const links = computed(() => {
    return routes.map(i => i.path);
});

const $router = useRouter();

const onClickLink = (link) => {
    $router.push(link);
};

</script>