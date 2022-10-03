<script setup>
import { useMainStore } from '@/stores/main'
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: String,
    default: null
  },
})

const mainStore = useMainStore()


</script>

<template>
  <div>
    <img
      :src="image"
      alt="profile_picture"
      class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-gray-800"
    >
  </div>
</template>
