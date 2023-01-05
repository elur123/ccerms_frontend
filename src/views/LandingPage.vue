<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStyleStore } from '@/stores/style.js'
import { sectionBgLogin } from '@/colors.js'

import { url } from '@/config'
import { useResearcharchiveStore } from '@/stores/admin/researcharchives.js';

import ResearchArchivesTable from '@/views/student/components/ResearchArchivesTable.vue'

const researchStore = useResearcharchiveStore()

const styles = [
  'white',
  'basic'
]

const about = ref(null);
const research = ref(null);
const search_research = ref('')

const styleStore = useStyleStore()

styleStore.setDarkMode(false)

researchStore.fetch('', 1)

const router = useRouter()

const toLogin = () => {
  router.push('/login')
}

const goto = (refName) => {
    var element = refName == 'about' ? about : research;
    var top = element.offsetTop;

    window.scrollTo(0, top);
}

// Search Research function
const searchResearch = () => {
  researchStore.fetch(search_research.value, 1)
}


</script>

<template>
<div class="h-screen relative overflow-x-hidden">
  <nav class="absolute top-0 w-full shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-12 md:h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-12 w-12" :src="`${url}myfiles/logo/ccerms_logo.png`" alt="ccerms_logo">
          </div>
        </div>
        <div class="">
          <div class="ml-4 flex items-center md:ml-6">
            <button class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" @click="toLogin">Login</button>
            <button class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" @click="router.push('/register')">Register</button>
          </div>
        </div>

      </div>
    </div>
  </nav>
  <main>
    <div class="w-screen h-full md:h-screen">
      <div class="background h-[360px] md:h-full">
        <img class="h-full w-full lg:object-cover" :src="`${url}myfiles/logo/banner_one.png`" alt="ccerms_banner">
      </div>
    </div>
    
    <section id="about h-full w-full" ref="about" class="py-[80px] px-4">
      <div class="mx-auto max-w-7xl py-6 pb-20 sm:px-6 lg:px-8">
          <h2 class="text-5xl font-bold p-3">ABOUT</h2>
          <div class="h-full flex flex-col md:flex-row justify-evenly items-center gap-2 rounded-lg py-2">
            <div class="about-description w-full h-1/2 order-2 md:order-1 p-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

              <div class="w-full flex justify-around items-center">
                <div class="w-full">
                  <img class="w-full" :src="`${url}myfiles/logo/UM.png`" alt="cce logo">
                </div>
                <div class="w-full">
                  <img class="w-full" :src="`${url}myfiles/logo/CCE.png`" alt="cce logo">
                </div>
                
                
              </div>
            </div>
            <div class="about-image rounded  w-full h-1/2 order-1 md:order-2 md:h-full p-3">
              <img class="w-full h-full rounded drop-shadow-md" :src="`${url}myfiles/logo/ccerms_logo.png`" alt="CCERMS LOGO">
            </div>
          </div>
      </div>
    </section>

    <section id="research" ref="research" class="py-[80px] px-4">
      <div class="mx-auto max-w-7xl py-6 pb-20 sm:px-6 lg:px-8">
          <h2 class="text-5xl font-bold">RESEARCH ARCHIVES</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-3 w-full">
              <input class="w-full bg-transparent border-b border-b-1 border-0 focus:outline-none focus:ring-0 focus:border-yellow-400 focus:border-b-2" 
                type="text" 
                placeholder="Hit enter to search research..."
                v-model="search_research"
                @keyup.enter="searchResearch"
              >
            </div>
          </div>

          <ResearchArchivesTable :data="researchStore.list" :search="search_research" />
      </div>
    </section>
  </main>
</div>
</template>
