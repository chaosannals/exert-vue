<template>
    <div class="index-page">
        <div v-for="link in links" @click="onClickLink(link)">
            <span>{{ link }}</span>
        </div>
    </div>
</template>

<script setup>
import {routes} from '../router';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const $router = useRouter();
const links = computed(() => {
    return routes.map(i => i.path);
});
const onClickLink = (link) => {
    $router.push(link);
};

</script>