<template>
    <div class="i18n-2-page">

    </div>
</template>

<script lang="ts" setup>

class MyI18nItem {
    id: number;
    age: number;
    name: string;
    name_en: string;
    name_jp: string;
    content: string;
    content_en: string;
    content_jp: string;
}

type MyI18nLang = "" | "en" | "jp";
type MyI18nItemResult = (`${keyof MyI18nItem}_${MyI18nLang}` & keyof MyI18nItem);
type MyI18nItemParam = keyof {
    [P in keyof MyI18nItem as (`${P}_${MyI18nLang}` & keyof MyI18nItem) extends never ? never : P] : any
}

const switchLangTo = (name: MyI18nItemParam, lang: MyI18nLang): MyI18nItemResult => {
    return `${String(name)}_${lang}` as MyI18nItemResult
}

switchLangTo("name", "en")
switchLangTo("content", "jp")
</script>