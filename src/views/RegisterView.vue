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
import { customAlert } from '@/alert.js'

import { useAuthStore } from '@/stores/auth.js';
import { useLayoutStore } from '@/stores/layout.js'

import { url } from '@/config'

const pinia = createPinia()

const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const router = useRouter()
let loader = inject('Loader')

const submit = () => {
  layoutStore.showLoading = true
  authStore.login().then(res => {
    layoutStore.showLoading = false
    if (res.data.status === 200) {
      customAlert('success', 'Welcome back user!')
      authStore.user = res.data.details
      authStore.clear()
      router.push('/admin/dashboard')
    }
    else {
      customAlert('warning', 'Email password not match')
    }
  })
  
}
</script>

<template>
  <SectionFullScreen
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >

    <img class="hidden md:block" :src="`${url}myfiles/logo/ccerms_logo.png`" alt="ccerms_logo">

    <CardBox
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >

      <FormField
        label="Email"
        help="Please enter your email"
      >
        <FormControl
          v-model="authStore.form.email"
          :icon="mdiAccount"
          name="login"
          autocomplete="username"
        />
      </FormField>

      <FormField
        label="Password"
        help="Please enter your password"
      >
        <FormControl
          v-model="authStore.form.password"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
        />
      </FormField>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          type="submit"
          color="warning"
          label="Register"
        />
        <!-- <BaseButton
          to="/dashboard"
          color="info"
          outline
          label="Back"
        /> -->
      </BaseButtons>
    </CardBox>
  </SectionFullScreen>
</template>
