<template>
    <div class="i18n-3-page">

    </div>
</template>

<script lang="ts" setup>


class MyI18nItem {
    id?: number;
    age?: number;
    name?: string;
    name_en?: string;
    name_jp?: string;
    content?: string;
    content_en?: string;
    content_jp?: string;
}

type OnlyString<T> = (keyof T) & (string | number);

type MyI18nLang = "zh" | "en" | "jp";
type MyFilter<T> = {
    [P in OnlyString<T> as (`${P}_${MyI18nLang}` & keyof T) extends never ? never : P] : any
};
type MyParam<T> = keyof MyFilter<T>;
type MyResult<T> = (`${OnlyString<keyof T>}_${MyI18nLang}` & keyof T) | MyParam<T>;

const switchLangTo = <T>(name: MyParam<T>, lang: MyI18nLang = "zh"): MyResult<T> => {
    return (lang !== "zh" ? `${String(name)}_${lang}` : name) as MyResult<T>
}

switchLangTo<MyI18nItem>("name", "zh");
switchLangTo<MyI18nItem>("content", "en");
</script>