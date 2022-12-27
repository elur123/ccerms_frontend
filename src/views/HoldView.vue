<script setup>
import { reactive, inject } from 'vue'
import { createPinia } from 'pinia'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk, mdiTableBorder } from '@mdi/js'


import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import NotificationBar from '@/components/NotificationBar.vue'

import { useAuthStore } from '@/stores/auth.js';

import { url } from '@/config'

const pinia = createPinia()

const authStore = useAuthStore()

const router = useRouter()
let loader = inject('Loader')

const returnHome = () => {
    
  router.push('/')
  
}
</script>

<template>

    <section class="w-screen h-screen flex flex-col justify-center gap-4 items-center bg-yellow-200">
        <h4 class="text-lg font-bold">Contact admin to verify your account.</h4>

        <button @click="returnHome">Return Home</button>
    </section>
</template>
