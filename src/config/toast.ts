import type { ToastContainerOptions } from 'vue3-toastify';

const toastDefaultOptions: ToastContainerOptions = {
  autoClose: 2500,
  closeButton: false,
  pauseOnHover: true,
  closeOnClick: true,
  position: 'bottom-center',
  theme: 'colored',
  transition: 'zoom',
};

export default toastDefaultOptions;
