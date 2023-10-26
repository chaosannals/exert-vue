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
            <span>I'm a tooltip</span>
            <div v-if="data.visible" class="arrow" data-popper-arrow></div>
        </div>

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
    const popuper = createPopper(button.value, tooltip.value, {
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
        placement: 'right',
    });
    console.log('popuper', popuper);
    document.addEventListener('mousedown', onMouseDown);

    // setTimeout(() => {
    //     popuper.update();
    // }, 1000);
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

    &[data-popper-placement^='top']>.arrow::before {
        bottom: -4px;
    }

    &[data-popper-placement^='bottom']>.arrow::before {
        top: -4px;
    }

    &[data-popper-placement^='left']>.arrow::before {
        right: -4px;
    }

    &[data-popper-placement^='right']>.arrow::before {
        left: -4px;
        transform: translate(0, 50%), rotate(45deg);
    }
}

.arrow,
.arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
}

.arrow {
    visibility: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}

.arrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
}
</style>