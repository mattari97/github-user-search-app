import './assets/main.css';
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import vue3Toastify from 'vue3-toastify';
import toastDefaultOptions from '@/config/toast';

const app = createApp(App);
app.use(vue3Toastify, toastDefaultOptions);
app.mount('#app');
