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

const authStore = useAuthStore(pinia)

const router = useRouter()
let loader = inject('Loader')

const submit = () => {
  loader.show();
  authStore.login().then(res => {
    loader.hide()
    if (res.data.status === 200) {
      router.push('/admin/dashboard')
    }
  })
  
}
</script>

<template>
  <SectionFullScreen
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >

    <img :src="`${url}myfiles/logo/ccerms_logo.png`" alt="ccerms_logo">

    <CardBox
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
    <NotificationBar
      v-if="authStore.status.status"
      :color="authStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
    >
      {{ authStore.status.message }}
    </NotificationBar>
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
          label="Login"
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
