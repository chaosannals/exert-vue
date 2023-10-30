import { createPersistedState } from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';

const persist = createPersistedState({
    storage: localStorage,
    beforeRestore: (context) => {
        console.log('beforeRestore', context);
    },
    key: i => `__store__${i}`,
});
const pinia = createPinia();
pinia.use(persist);

export default pinia;