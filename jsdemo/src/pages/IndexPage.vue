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
import router from '../router';

const data = reactive({});
const links = computed(() => {
    return routes.map(i => i.path);
});

const onClickLink = (link) => {
    router.push(link);
};

</script>