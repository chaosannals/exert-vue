<template>
  <div>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
    <div>{{ store.version }}</div>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from './stores/common';

const store = useCommonStore();
</script>

<style scoped></style>
