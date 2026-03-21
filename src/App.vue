<template>
  <div :class="`theme-${currentTheme}`">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useConfigStore } from "@/stores";

const configStore = useConfigStore();
const currentTheme = computed(() => (configStore.config.primaryColor as string) || "blue");
</script>
