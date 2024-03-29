<template>
    <div class="ts-build-in-generic-page">

    </div>
</template>

<script lang="ts" setup>

class DemoTypeA {
    id?: number;
    name?: string;
    PascalCase?: string;
    camelCase?: string;
    snake_case?: string;
}

export type KeyOfAUpper = Uppercase<keyof DemoTypeA>;
export type KeyOfALower = Lowercase<keyof DemoTypeA>;
export type KeyOfACapt = Capitalize<keyof DemoTypeA>;
export type KeyOfAUncapt = Uncapitalize<keyof DemoTypeA>;

</script>