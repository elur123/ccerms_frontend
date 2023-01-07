<script setup>
import { ref, reactive } from 'vue'
import { mdiAccount, mdiAccountCircle, mdiLock, mdiMail, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionBottomOtherPages from '@/components/SectionBottomOtherPages.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import UserCard from '@/components/UserCard.vue'

import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

const mainStore = useMainStore()
const authStore = useAuthStore()

const titleStack = ref(['Admin', 'Profile'])

const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail
})

const passwordForm = reactive({
  password_current: '',
  password: '',
  password_confirmation: ''
})

const submitProfile = () => {
  mainStore.setUser(profileForm)
}

const submitPass = () => {
  //
}
</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />

  <UserCard :user="authStore.user" />

  <SectionMain>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CardBox
        title="Edit Profile"
        :icon="mdiAccountCircle"
        form
        @submit.prevent="submitProfile"
      >
        <FormField
          label="Avatar"
          help="Max 500kb"
        >
          <FormFilePicker />
        </FormField>

        <FormField
          label="Name"
          help="Required. Your name"
        >
          <FormControl
            v-model="profileForm.name"
            :icon="mdiAccount"
            name="username"
            required
            autocomplete="username"
          />
        </FormField>
        <FormField
          label="E-mail"
          help="Required. Your e-mail"
        >
          <FormControl
            v-model="profileForm.email"
            :icon="mdiMail"
            type="email"
            name="email"
            required
            autocomplete="email"
          />
        </FormField>

        <BaseDivider />

        <BaseButtons>
          <BaseButton
            color="info"
            type="submit"
            label="Submit"
          />
        </BaseButtons>
      </CardBox>

    </div>
  </SectionMain>
</template>
