<template>
    <PageLayout class="demo-table-v2-page">
        <ElAutoResizer>
            <template #default="{ height, width }">
                <ElTableV2 :columns="columns" :data="data.rows" :height="height" :width="width" :fixed="false" ></ElTableV2>
            </template>
        </ElAutoResizer>
    </PageLayout>
</template>

<script setup lang="tsx">
import { onBeforeMount, reactive } from 'vue';
import { Faker, zh_CN } from '@faker-js/faker';
import { format } from 'date-fns';

const faker = new Faker({
    locale: [zh_CN],
});

const columns = reactive([
    {
        key: 'name',
        dataKey: 'name',
        title: '名字',
        width: 150,
    },
    {
        key: 'age',
        dataKey: 'age',
        title: '年龄',
        width: 100,
    },
    {
        key: 'email',
        dataKey: 'email',
        title: '邮箱',
        width: 300,
    },
    {
        key: 'birthdate',
        dataKey: 'birthdate',
        title: '生日',
        width: 300,
        cellRenderer: (row: { cellData: Date; }) => {
            return (
                <span>{format(row.cellData, 'yyyy-MM-dd')}</span>
            );
        },
    },
]);

const data = reactive({
    rows: [],
} as {
    rows: any[],
});

const initRows = () => {
    for (let i = 0; i < 10000; ++i) {
        const row = {
            name: faker.person.fullName(),
            age: faker.number.int({ min: 1, max: 100 }),
            avatar: faker.image.avatar(),
            email: faker.internet.email(),
            birthdate: faker.date.birthdate(),
        };
        data.rows.push(row);
    }
};

initRows();

onBeforeMount(() => {
});
</script>

<style scoped lang="scss">
.demo-table-v2-page {}
</style>