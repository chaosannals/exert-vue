<template>
  <div>
    <router-view></router-view>
    <div>{{ store.version }}</div>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from './stores/common';

const store = useCommonStore();
</script>

<style scoped></style>
