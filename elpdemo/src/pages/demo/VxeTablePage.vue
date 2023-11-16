<template>
    <PageLayout class="demo-vxe-table-page">
        <ElAutoResizer style="overflow: hidden;">
            <template #default="{ height }">
                <VxeTable class="table" :column-config="{resizable: true}" :height="height" :data="data.rows" border show-overflow>
                    <VxeColumn type="seq" title="#" width="60"></VxeColumn>
                    <VxeColumn type="checkbox" width="60"></VxeColumn>
                    <VxeColumn field="name" title="姓名"></VxeColumn>
                    <VxeColumn field="age" title="年龄"></VxeColumn>
                    <VxeColumn field="birthdate" title="生日">
                        <template #default="{row}">
                            <span>{{ format(row.birthdate, 'yyyy-MM-dd') }}</span>
                        </template>
                    </VxeColumn>
                    <VxeColumn field="email" title="邮箱"></VxeColumn>
                </VxeTable>
            </template>
        </ElAutoResizer>
    </PageLayout>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { Faker, zh_CN } from '@faker-js/faker';
import { format } from 'date-fns';

const faker = new Faker({
    locale: [zh_CN],
});

const data = reactive({
    rows: [],
} as {
    rows: any[],
});

const initRows = ()  => {
    for (let i = 0; i < 100; ++i) {
        const row = {
            name: faker.person.fullName(),
            age: faker.number.int({ min: 1, max: 100 }),
            avatar: faker.image.avatar(),
            email: faker.internet.email(),
            birthdate: faker.date.birthdate(),
        };
        data.rows.push(row);
    }
}

initRows();

onBeforeMount(() => {

});
</script>

<style scoped lang="scss">
.demo-vxe-table-page {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
</style>