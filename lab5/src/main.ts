import '@/assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import directivesPlugin from '@/plugins/directives';
import i18n from '@/plugins/i18n';
import App from './App.vue';
// import DemoI18n from "@/DemoI18n.vue";
import router from './router';
import serviceProvider from '@/plugins/serviceProvider';
import auth from '@/firebase';
import useAuth from '@/composables/useAuth';

auth.onAuthStateChanged((firebaseUser: any): void => {
    const { userState } = useAuth();
    if (firebaseUser) {
        userState.user = firebaseUser;
        userState.authorized = true;
    } else {
        userState.user = undefined;
        userState.authorized = false;
    }
    console.log(userState);
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(directivesPlugin);
    app.use(i18n, {
        greetings: {
            hi: 'Привіт!'
        }
    });
    app.use(serviceProvider);
    app.use(router);
    app.mount('#app');
});
