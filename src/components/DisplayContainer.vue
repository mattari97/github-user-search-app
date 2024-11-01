<script setup lang="ts">
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useGlobalStore } from '@/stores/global';
import fetchApi from '@/utils/fetchApi';
import { getLocalStorageData } from '@/utils/storage';

const store = useGlobalStore();

onMounted(async () => {
  store.setLoading(true);
  const username = getLocalStorageData('username') ?? 'octocat';
  const { data, error } = await fetchApi(username);

  if (error) {
    toast.error(error);
    store.setLoading(false);
    return;
  }

  if (data) {
    store.setData(data);
    return;
  }

  /**
   * TODO: Redirect to fallback page
   * because at this point API is broken
   */
});
</script>

<template>
  <section>
    <div>{{ JSON.stringify(store.data, null, 2) }}</div>
  </section>
</template>

<style scoped>
section {
  margin-block-start: 1rem;
  display: grid;
  place-items: center;
}

div {
  white-space: pre-wrap;
  font-family: monospace;
}
</style>
