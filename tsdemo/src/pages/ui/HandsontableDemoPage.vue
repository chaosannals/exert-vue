<template>
  <div class="">
    <div>
        这个表格商用收费，双协议。
    </div>
    <HotTable :data="rows" :rowHeaders="true" :colHeaders="true"> </HotTable>
  </div>
</template>

<script lang="ts" setup>
import { HotTable } from "@handsontable/vue3";
import { ref } from "vue";

const rows = ref([
  ["", "Ford", "Volvo", "Toyota", "Honda"],
  ["2016", 10, 11, 12, 13],
  ["2017", 20, 11, 14, 13],
  ["2018", 30, 15, 12, 13],
]);
</script>
