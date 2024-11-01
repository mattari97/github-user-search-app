<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue';
import type { TTheme, TThemeLabel } from '@/types';
import MoonIcon from '@/components/icons/MoonIcon.vue';
import SunIcon from '@/components/icons/SunIcon.vue';
import { getLocalStorageData, setLocalStorageData } from '@/utils/storage';

const theme: Ref<TTheme | undefined> = ref();
const themeLabel: ComputedRef<TThemeLabel> = computed(() =>
  theme.value === 'light' ? 'Dark' : 'Light',
);

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setLocalStorageData('theme', theme.value);
  localStorage.setItem('theme', theme.value);
  document.documentElement.dataset.theme = theme.value;
};

onMounted(() => {
  // Get from local storage
  const storedTheme = getLocalStorageData('theme');
  const isValidTheme = 'light' === storedTheme || 'dark' === storedTheme;
  if (isValidTheme) {
    theme.value = storedTheme;
    document.documentElement.dataset.theme = storedTheme;
    return;
  }

  // Fallback to prefered-color-scheme
  const preferedTheme: TTheme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches
    ? 'dark'
    : 'light';

  theme.value = preferedTheme;
  document.documentElement.dataset.theme = preferedTheme;
});
</script>

<template>
  <header>
    <h1>devfinder</h1>
    <button
      @click="toggleTheme"
      :aria-label="`Switch to ${themeLabel.toLowerCase()} mode`"
    >
      <span>{{ themeLabel }}</span>
      <MoonIcon v-if="theme === 'light'" />
      <SunIcon v-else />
    </button>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: var(--clr-logo);
  font-size: var(--fs-xl);
  font-weight: var(--fw-bold);
  line-height: var(--lh-none);
  padding-block-end: 5px;
}

button {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  margin-inline-end: -0.5rem;
  color: var(--clr-theme-toggle);
  transition: color 200ms ease-out;
}

button:hover {
  color: var(--clr-theme-toggle--hover);
}

span {
  display: block;
  text-transform: uppercase;
  font-weight: var(--fw-bold);
  font-size: var(--fs-sm);
}

svg {
  width: 20px;
}
</style>
