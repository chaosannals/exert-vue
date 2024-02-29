<template>
  <div class="canvas-demo-page">
    <div class="toolbar"></div>
    <canvas
      ref="$canvas"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    ></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";

const $canvas = ref();

const data = reactive({
  scrollX: 0,
  scrollY: 0,
  scrollStartX: 0,
  scrollStartY: 0,
  dragStartX: 0,
  dragStartY: 0,
  isDrag: false,
  context: null,
  lastDrawAt: 0,
});



const delay = (durationMs) => {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
};

const scrollAdjust = (e) => {
    const newX = data.scrollStartX + e.offsetX - data.dragStartX;
    const newY = data.scrollStartY + e.offsetY - data.dragStartY;
    data.scrollX = Math.min(newX, 0);
    data.scrollY = Math.min(newY, 0);
}

const draw = () => {
    const canvas = $canvas.value;
    const ctx = data.context;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const boxW = 150;
    const boxH = 80;
    for (var i = 0; i < 20; ++i) {
      var x = data.scrollX + i * 100;
      var y = data.scrollY + i * 100;
      ctx.fillStyle = i % 2 ? "red" : "green";
      ctx.fillRect(x, y, boxW, boxH);
      ctx.fillStyle = "white";
      var text = `NN${i}`;
      var mt = ctx.measureText(text);
      var tx = x + (boxW - mt.width) / 2;
      var thd = mt.actualBoundingBoxAscent + mt.actualBoundingBoxDescent;
      var ty = y + (boxH + thd) / 2;
      ctx.fillText(text, tx, ty);

      // ctx.fillStyle = "blue";
      // ctx.fillRect(tx, ty, mt.width, 100);
      // console.log(tx, ty, mt);
    }
}

const drawFrame = async (timeStamp) => {
  data.lastDrawAt = timeStamp;
//   console.log(timeStamp);

  if (data.isDrag) {
    draw();
  } else {
    await delay(100);
  }
  window.requestAnimationFrame(drawFrame);
};

const onMouseDown = (e) => {
  data.isDrag = true;
  data.scrollStartX = data.scrollX;
  data.scrollStartY = data.scrollY;
  data.dragStartX = e.offsetX;
  data.dragStartY = e.offsetY;
  //   console.log("down", e);
};

const onMouseMove = (e) => {
  if (data.isDrag) {
    // console.log("move", e);
    scrollAdjust(e);
  }
};

const onMouseUp = (e) => {
  if (data.isDrag) {
    data.isDrag = false;
    scrollAdjust(e);
    console.log("up", e);
  }
};

const onMouseLeave = (e) => {
  if (data.isDrag) {
    data.isDrag = false;
    scrollAdjust(e);
    console.log("leave", e);
  }
};

onMounted(() => {
  console.log($canvas);

  const canvas = $canvas.value;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  console.log("canvas size: ", canvas.width, canvas.height);
  const ctx = canvas.getContext("2d");
  ctx.font = "48px serif";
  data.context = ctx;
  draw();
  window.requestAnimationFrame(drawFrame);
});
</script>

<style lang="scss" scoped>
.canvas-demo-page {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  flex-direction: column;

  .toolbar {
    flex-shrink: 0;
    height: 4em;
    width: 100%;
  }

  canvas {
    flex-grow: 1;
    width: 100%;
    border: 1px solid red;
    box-sizing: border-box;
  }
}
</style>
