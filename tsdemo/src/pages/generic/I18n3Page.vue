<template>
    <div class="i18n-3-page">

    </div>
</template>

<script lang="ts" setup>

const canntConcatSymbol = Symbol();

class MyI18nItem {
    id?: number;
    age?: number;
    name?: string;
    name_en?: string;
    name_jp?: string;
    content?: string;
    content_en?: string;
    content_jp?: string;
    // 以上的名 "id" | "age" | ... 都是 string 类型枚举项
    [1]: any; // number 类型的 keyof 是可以用的。
    ["1_en"]: any; // 因为这项提供了 en ，导致 1 也是可以被作为有效名。
    [canntConcatSymbol]?: string; // 这一项是不会被拼接识别到的，被 OnlyString 排除，不然不能下面的字段名拼接判定。
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
switchLangTo<MyI18nItem>(1, "en");
</script>