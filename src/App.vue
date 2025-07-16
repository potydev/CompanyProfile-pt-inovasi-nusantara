<template>
  <Layout />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Layout from './components/Layout.vue'
import { useAuthStore } from './store'

const authStore = useAuthStore()

onMounted(() => {
  // Check authentication status on app load
  authStore.checkAuth()
})
</script>

