<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStyleStore } from '@/stores/style.js'
import { sectionBgLogin } from '@/colors.js'

import { url } from '@/config'

const styles = [
  'white',
  'basic'
]

const about = ref(null);
const research = ref(null);

const styleStore = useStyleStore()

styleStore.setDarkMode(false)

const router = useRouter()

const toLogin = () => {
  router.push('/login')
}

const goto = (refName) => {
    var element = refName == 'about' ? about : research;
    var top = element.offsetTop;

    window.scrollTo(0, top);
}

</script>

<template>
<div class="h-screen">
  <nav class="bg-yellow-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-12 w-12" :src="`${url}myfiles/logo/ccerms_logo.png`" alt="ccerms_logo">
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <button  class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</button>

              <button class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" @click="goto('about')">About</button>

              <button class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Research</button>
              
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <button class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" @click="toLogin">Login</button>
            <button class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</button>
          </div>
        </div>

      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Home</a>

        <a href="#" class="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" @click="goto('about')">About</a>

        <a href="#" class="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Research</a>
      </div>
      <div class="px-2 pt-4 pb-3 border-t border-gray-700">
        <button class="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" @click="toLogin">Login</button>
        <button class="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Register</button>
      </div>
    </div>
  </nav>

  <header class="bg-white shadow">
  </header>
  <main>
    <div class="w-screen h-full">
      <img class="object-cover" :src="`${url}myfiles/logo/banner_one.png`" alt="ccerms_banner">
    </div>
    
    <section id="about" ref="about">
      <div class="mx-auto max-w-7xl py-6 pb-20 sm:px-6 lg:px-8">
          <h2 class="text-5xl font-bold">ABOUT</h2>
          <div class="mt-5 h-96 rounded-lg border-4 border-dashed border-gray-200"></div>
      </div>
    </section>

    <section id="research" ref="research">
      <div class="mx-auto max-w-7xl py-6 pb-20 sm:px-6 lg:px-8">
          <h2 class="text-5xl font-bold">RESEARCH ARCIVES</h2>
          <div class="mt-5 h-96 rounded-lg border-4 border-dashed border-gray-200"></div>
      </div>
    </section>
  </main>
</div>
</template>
