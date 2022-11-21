<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useLayoutStore } from '@/stores/layout.js'
import { useAuthStore } from '@/stores/auth.js'
import { adminMenu, studentMenu } from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'

const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const isAsideLgActive = computed(() => layoutStore.isAsideLgActive)

const overlayClick = () => {
  layoutStore.asideLgToggle(false)
}

const menu = computed(() => {
  return authStore.user != null && authStore.user.usertype_id != 6 ? adminMenu : studentMenu
})
</script>

<template>
  <NavBar />
  <AsideMenu :menu="menu" />
    <RouterView />
  <FooterBar />
  <OverlayLayer
    v-show="isAsideLgActive"
    z-index="z-30"
    @overlay-click="overlayClick"
  />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

</style>
