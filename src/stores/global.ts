import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { TGitHubAPIProfile } from '@/types';
import { generateGitHubApiEmptyObject } from '@/utils/fetchGitHubApi';

export const useGlobalStore = defineStore('global', () => {
  const data: Ref<TGitHubAPIProfile> = ref(generateGitHubApiEmptyObject());
  const loading: Ref<boolean> = ref(false);

  const setData = (val: TGitHubAPIProfile) => {
    data.value = val;
    loading.value = false;
  };

  const setLoading = (val: boolean) => {
    loading.value = val;
  };

  return { data, loading, setData, setLoading };
});
