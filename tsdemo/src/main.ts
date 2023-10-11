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
        keywords: 'def return',
        contains: [
            {
                scope: 'string',
                begin: '"',
                end: '"'
            },
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
