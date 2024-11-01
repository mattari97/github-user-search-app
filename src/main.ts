import './assets/main.css';
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vue3Toastify from 'vue3-toastify';
import App from './App.vue';
import toastDefaultOptions from '@/config/toast';

const app = createApp(App);

// State management
const pinia = createPinia();
app.use(pinia);

// Toast notifications
app.use(vue3Toastify, toastDefaultOptions);

// Start app
app.mount('#app');
