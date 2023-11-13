<template>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
    <div class="version">{{ store.version }}</div>
</template>

<script setup lang="ts">
import { useCommonStore } from './stores/common';

const store = useCommonStore();
</script>

<style scoped lang="scss">
.version {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
