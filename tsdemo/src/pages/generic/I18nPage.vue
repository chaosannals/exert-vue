<template>
    <div class="i18n-page">

    </div>
</template>

<script lang="ts" setup>

class MyI18nItem {
    id: number;
    name: string;
    name_en: string;
    name_jp: string;
    content: string;
    content_en: string;
    content_jp: string;
}

type MyI18nLang = "" | "en" | "jp";
type MyI18nItemParam = 'name' | 'content';
type MyI18nItemResult = (`${MyI18nItemParam}_${MyI18nLang}`| `${MyI18nItemParam}${MyI18nLang}` | keyof MyI18nItemParam) & keyof MyI18nItem;

const switchLangTo = (name: MyI18nItemParam, lang: MyI18nLang): MyI18nItemResult => {
    return `${String(name)}_${lang}` as MyI18nItemResult
}

switchLangTo("name", "en")
switchLangTo("content", "jp")
</script>