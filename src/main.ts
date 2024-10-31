import './assets/main.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import { createApp } from 'vue';
import App from './App.vue';
import ToastPlugin from 'vue-toast-notification';
import type { ToastProps } from 'vue-toast-notification';

// Toast settings
const toastSettings: ToastProps = {
  duration: 2500,
  dismissible: true,
  position: 'bottom',
  pauseOnHover: true,
};

const app = createApp(App);
app.use(ToastPlugin, toastSettings);
app.mount('#app');
