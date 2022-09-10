<script setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout.js'
import BaseLevel from '@/components/BaseLevel.vue'
import JustboilLogo from '@/components/JustboilLogo.vue'

const year = computed(() => new Date().getFullYear())

const isFooterBarVisible = computed(() => !useLayoutStore().isFullScreen)
</script>

<template>
  <footer
    v-show="isFooterBarVisible"
    class="bg-white py-2 px-6 dark:bg-gray-900/70"
  >
    <BaseLevel>
      <div class="text-center md:text-left">
        <b>&copy; {{ year }}, <a
          href="https://justboil.me/"
          target="_blank"
        >Template from JustBoil.me</a>.</b>
      </div>
      <div class="md:py-2">
        <a href="https://justboil.me">
          <span>CCE</span> <b class="font-black">RMS</b>
          <!-- <JustboilLogo class="w-auto h-8 md:h-6" /> -->
        </a>
      </div>
    </BaseLevel>
  </footer>
</template>
