<script setup>
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { url } from '@/config.js'


const authStore = useAuthStore()

const profile_picture = computed(() => authStore.user !== null ? authStore.user.file_url ?? `${url}myfiles/profile_pictures/default.png` : '')


</script>

<template>
  <div>
    <img
      :src="profile_picture"
      alt="profile_picture"
      class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-gray-800"
    >
  </div>
</template>
