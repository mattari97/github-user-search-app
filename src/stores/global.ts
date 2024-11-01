import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const data: Ref<object> = ref({});
  const loading: Ref<boolean> = ref(false);

  const setData = (val: object) => {
    data.value = val;
    loading.value = false;
  };

  const setLoading = (val: boolean) => {
    loading.value = val;
  };

  return { data, loading, setData, setLoading };
});
