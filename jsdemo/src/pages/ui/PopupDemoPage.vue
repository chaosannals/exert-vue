<template>
    <div class="popup-demo-page" :class="[id]">
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button ref="button" aria-describedby="tooltip" @click="onClick">I'm a button</button>
        <div ref="tooltip" role="tooltip" :class="tipClass">
            <p>I'm a tooltip</p>
            <p>I'm a tooltip</p>
        </div>

        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
        <button>AAAAA</button>
    </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { createPopper } from '@popperjs/core';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';

const id = `popuper-${new Date().getTime()}`;

const findSelf = (node) => {
    if (node.className.indexOf(id) >= 0) {
        return true;
    }
    if (node.parentElement) {
        return findSelf(node.parentElement);
    }
    return false;
};

const button = ref();
const tooltip = ref();
const popuper = ref(null);

const placements = ['top', 'left', 'right', 'bottom'];
const data = reactive({
    visible: false,
});

const tipClass = computed(() => {
    const r = {
        show: data.visible
    };
    r[id] = true;
    return r;
});

const onClick = () => {
    if (!data.visible) {
        // data.visible = !data.visible;
        data.visible = true;
    }
    const index = (placements.indexOf(popuper.value.state.placement) + 1) % placements.length;
    console.log('onClick', index, placements[index], popuper.value.state.placement);
    popuper.value.setOptions({ placement: placements[index] });
    popuper.value.forceUpdate();
};

const onMouseDown = (e) => {
    console.log(e);
    if (!findSelf(e.target)) {
        data.visible = false;
    }
};

onMounted(() => {
    console.log('mounted', button.value, tooltip.value);
    document.body.appendChild(tooltip.value);
    popuper.value = createPopper(button.value, tooltip.value, {
        modifiers: [
            preventOverflow, flip,
            {
                name: 'preventOverflow',
                options: {
                    rootBoundary: 'document',
                },
            },
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
        placement: 'top',
    });
    console.log('popuper', popuper.value);
    document.addEventListener('mousedown', onMouseDown);
});

onBeforeUnmount(() => {
    document.body.removeChild(tooltip.value);
    document.removeEventListener('mousedown', onMouseDown);
});
</script>

<style scoped>
[role=tooltip] {
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 13px;
    visibility: hidden;
    /* display: none; */

    &.show {
        visibility: visible;
        /* display: block; */
    }

    &::before {
        position: absolute;
        content: '';
        width: 8px;
        height: 8px;
        background-color: #333;
    }

    &[data-popper-placement^='top']::before {
        bottom: -4px;
        left: 50%;
        transform: translate(-50%, 0) rotate(45deg);
    }

    &[data-popper-placement^='bottom']::before {
        top: -4px;
        left: 50%;
        transform: translate(-50%, 0) rotate(45deg);
    }

    &[data-popper-placement^='left']::before {
        right: -4px;
        top: 50%;
        transform: translate(0, -50%) rotate(45deg);
    }

    &[data-popper-placement^='right']::before {
        left: -4px;
        top: 50%;
        transform: translate(0, -50%) rotate(45deg);
    }
}
</style>