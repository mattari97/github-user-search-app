<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import SearchBar from '@/components/SearchBar.vue';
import DisplayContainer from './components/DisplayContainer.vue';
</script>

<template>
  <MainHeader />
  <main>
    <SearchBar />
    <DisplayContainer />
  </main>
</template>
