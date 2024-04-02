<template>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
    <div class="version">{{ store.version }}</div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useCommonStore } from './stores/common';
import VConsole from 'vconsole';

const store = useCommonStore();
const vConsole = new VConsole({ theme: 'dark' });

onMounted(() => {
  console.log('aa');
});

onBeforeUnmount(() => {
  vConsole.destroy();
});
</script>

<style scoped lang="scss">
.version {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
