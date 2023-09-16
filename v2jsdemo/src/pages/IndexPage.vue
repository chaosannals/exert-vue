<template>
    <div class="index-page">
        <div v-for="link in links" @click="routeTo(link)">
            {{ link }}
        </div>
    </div>
</template>

<script>
import { routes } from '../router';

export default {
    data: () => {
        return {

        };
    },
    computed: {
        links: () => {
            return routes.map((it) => it.path);
        },
    },
    methods: {
        routeTo(link) {
            this.$router.push(link);
        },
    },
};
</script>