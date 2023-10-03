<template>
    <div class="index-page">
        <div v-for="link in links" @click="routeTo(link)">{{ link }}</div>
    </div>
</template>

<script lang="ts">
import { routes } from '../router';

export default {
    computed: {
        links() {
            return routes.map(i => i.path);
        },
    },
    methods: {
        routeTo(link: String) {
            // @ts-ignore
            this.$router.push(link);
        }
    }
};
</script>