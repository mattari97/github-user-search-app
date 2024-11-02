<script setup lang="ts">
import { computed, ref, useTemplateRef, type ComputedRef, type Ref } from 'vue';
import { toast } from 'vue3-toastify';
import type { TSearchError } from '@/types';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import { useGlobalStore } from '@/stores/global';
import fetchApi from '@/utils/fetchGitHubApi';
import { setLocalStorageData } from '@/utils/storage';

const store = useGlobalStore();
const searchError: Ref<TSearchError> = ref('');
const username: Ref<string> = ref('');
const inputRef = useTemplateRef('search-input');
const ariaDisabled: ComputedRef<boolean> = computed(() => !username.value);
const handleSearch = async () => {
  if (ariaDisabled.value) {
    return;
  }

  store.setLoading(true);
  const { data, error } = await fetchApi(username.value);

  if (error) {
    toast.error(error);
    store.setLoading(false);
    return;
  }

  if (data) {
    store.setData(data);
    setLocalStorageData('username', username.value);
    username.value = '';
    return;
  }

  searchError.value = 'No results';
  inputRef.value?.focus();
  store.setLoading(false);
};

const clearError = () => {
  if (!searchError.value) {
    return;
  }

  searchError.value = '';
};
</script>

<template>
  <section>
    <div>
      <SearchIcon />
      <input
        v-model.trim="username"
        @input="clearError"
        @keyup.enter="handleSearch"
        ref="search-input"
        type="text"
        placeholder="Search username..."
      />
    </div>
    <span v-if="searchError">{{ searchError }}</span>
    <button @click="handleSearch" :aria-disabled="ariaDisabled">Search</button>
  </section>
</template>

<style scoped>
section {
  display: flex;
  position: relative;
  align-items: center;
  margin-block-start: 2rem;
  border-radius: 1rem;
  background-color: var(--clr-surface);
}

div {
  flex: 1;
  display: flex;
  border-radius: 0.5rem;
  margin-inline-start: 0.5rem;
  padding-inline-start: 0.5rem;
}

div:focus-within {
  outline: 2px solid hsl(var(--clr-primary));
}

svg {
  flex-shrink: 0;
  color: hsl(var(--clr-primary));
  width: 20px;
}

input {
  flex: 1;
  min-width: 0;
  margin-inline: 0.5rem;
  padding-block: 0.75rem;
  flex-grow: 1;
  font-size: var(--fs-sm);
  color: hsl(var(--clr-text-200));
}

input::placeholder {
  color: var(--clr-text-100);
}

input:focus-visible {
  outline: none;
}

span {
  position: absolute;
  right: 0.5rem;
  bottom: calc(100% + 2px);
  color: hsl(var(--clr-error));
  font-size: var(--fs-sm);
}

button {
  align-self: center;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin: 0.5rem;
  color: hsl(var(--clr-light-100));
  background-color: hsl(var(--clr-primary));
  font-weight: var(--fw-bold);
  font-size: var(--fs-sm);
}

button[aria-disabled='true'] {
  background-color: hsl(var(--clr-primary) / 0.5);
  cursor: not-allowed;
}
</style>
