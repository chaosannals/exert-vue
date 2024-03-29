<template>
    <div class="intersection-observer-page">
        <div ref="b1" class="b1" :style="data.b1Style" @mousedown="onMouseDown">

        </div>
        <div ref="b2" class="b2" :style="data.b2Style">

        </div>
        <div>
            <button @click="onReset">重置</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';

// b1 和 b2 不是树节点关系不会触发。
// 解决方案：Element.getBoundingClientRect() 算出后自己计算交集
const b1 = ref();
const b2 = ref();

const data = reactive({
    dragTarget: null,
    b1StartX: 0,
    b1StartY: 0,
    b1Style: {},
    b2Style: {},
});

let b1b2Observer: IntersectionObserver | null = null;

const onMouseDown = (e: MouseEvent) => {
    if (e.target == b1.value) {
        data.dragTarget = e.target as any;
        data.b1StartX = e.clientX;
        data.b1StartY = e.clientY;
    }
};

const onMouseMove = (e: MouseEvent) => {
    if (data.dragTarget) {
        const x = e.clientX - data.b1StartX;
        const y = e.clientY - data.b1StartY;
        data.b1Style = {
            left: `${x}px`,
            top: `${y}px`,
        }
    }
}

const onMouseUp = (_e: MouseEvent) => {
    data.dragTarget = null;
}

const onReset = () => {
    data.b1Style = {};
    data.b2Style = {};
};

onMounted(() => {
    b1b2Observer = new IntersectionObserver((entities) => {
        console.log(entities);
    }, {
        root: b1.value,
        threshold: 1.0,
    });

    b1b2Observer.observe(b2.value);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

onBeforeUnmount(() => {
    b1b2Observer?.unobserve(b2.value);
    b1b2Observer?.disconnect();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
});

</script>

<style scoped lang="scss">
.intersection-observer-page {
    position: relative;
    width: 100%;
    height: 100%;

    .b1 {
        position: relative;
        background-color: red;
        width: 400px;
        height: 400px;
    }

    .b2 {
        position: absolute;
        background-color: blue;
        width: 400px;
        height: 200px;
    }
}
</style>