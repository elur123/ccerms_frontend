<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/BaseButton.vue'

import { useAuthStore } from '@/stores/auth.js';

import { url } from '@/config'


const authStore = useAuthStore()

const router = useRouter()

const returnHome = () => {
    
  router.push('/')
  
}
</script>

<template>

    <section class="w-screen h-screen flex flex-col justify-center gap-4 items-center bg-yellow-200">
        <h4 class="text-lg font-bold">Contact admin to verify your account.</h4>

        <BaseButton
            color="warning"
            label="Home"
            @click="router.push('/')"
        />
    </section>
</template>
