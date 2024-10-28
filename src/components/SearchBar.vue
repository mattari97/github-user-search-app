<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { TSearchError } from '@/types';

const error: Ref<TSearchError> = ref(null);
const username: Ref<string> = ref('');
const handleSearch = () => {
  console.log(username.value);
};
</script>

<template>
  <section>
    <input
      v-model="username"
      type="text"
      placeholder="Search GitHub username..."
    />
    <span v-if="error">{{ error }}</span>
    <button @click="handleSearch">Search</button>
  </section>
</template>
