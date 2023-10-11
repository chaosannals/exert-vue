import { createApp } from 'vue';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import 'highlight.js/styles/github.css';
import hljs, { HLJSApi } from 'highlight.js';

hljs.registerLanguage('mylang', (api: HLJSApi) => {
    console.log(api.listLanguages());
    return {
        case_insensitive: true,
        keywords: {
            $pattern: /[-a-z]+/, // 关键字模式，原本只匹配\w+
            keyword: 'def return',
            literal: ['false', 'true', 'null'],
        },
        contains: [
            // 字符串
            {
                scope: 'string',
                begin: '"',
                end: '"'
            },
            {
                scope: 'number',
                begin: /\d+/,
                end: /\.\d+/,
            },
            // 单行注释
            api.COMMENT('#', '\n')
        ]
    }
});
hljs.registerAliases('my',{ languageName: 'mylang' });

const persist = createPersistedState({
    storage: localStorage,
    key: i => `__store__${i}`,
});
const pinia = createPinia();
const app = createApp(App);
pinia.use(persist);
app.use(pinia);
app.use(router);
app.mount('#app');
