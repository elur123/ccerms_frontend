<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/BaseButton.vue'
import { customAlert } from '@/alert.js'

const router = useRouter()

</script>

<template>
  
  <div class="w-screen h-screen flex flex-col gap-5 justify-center items-center bg-yellow-200">

    <h3 class="text-gray-600 text-lg font-bold text-center  ">Registered Successfully, Wait or contact the admin to approve your account.</h3>

    <BaseButton
        color="warning"
        label="Home"
        @click="router.push('/')"
    />
  </div>
</template>
