<template>
    <button ref="reference" @click="onClick">Button</button>
    <div ref="floating" :style="floatingStyles">Tooltip</div>
</template>

<script lang="ts" setup>
/**
 * floating-ui 是原本 popper.js 而来。
 */
import { ref } from 'vue';
import {
    useFloating,
    offset,
    flip,
    shift,
    type Placement,
} from '@floating-ui/vue';

const reference = ref();
const floating = ref();
const placement = ref<Placement>('top');
const { floatingStyles, update: updateFloating } = useFloating(reference, floating, {
    transform: true,
    placement: placement,
    middleware: [offset(10), flip(), shift()],
});

const placements: Placement[] = ['top', 'left', 'right', 'bottom'];

const onClick = () => {
    const index = placements.indexOf(placement.value);
    console.log('inc', index);
    placement.value = placements[(index + 1) % placements.length];
    updateFloating();
}
</script>