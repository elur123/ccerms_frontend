<script setup>
import { ref, reactive } from 'vue'
import { mdiBallot, mdiPlus, mdiTableBorder } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import FormField from '@/components/FormField.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'
import NotificationBar from '@/components/NotificationBar.vue'

import Check from '@/views/admin/submissionone/components/Check.vue'
import Table from '@/views/admin/submissionone/components/Table.vue'

import { useSubmissionOneStore } from '@/stores/admin/submissionone.js';
import { useAuthStore } from '@/stores/auth.js'

const titleStack = ref(['Admin', 'Events', 'Capstone One Submissions'])

const submissionStore = useSubmissionOneStore()
const authStore = useAuthStore()


// Notification Hide Function
const hideNotification = () => {
  submissionStore.status.status = true
}

// Get Data
submissionStore.fetch(authStore.user.id)


// functions
const select = (item) => {
  
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />

  <SectionMain>

    <NotificationBar
      v-if="!submissionStore.status.status"
      :isDismissed="submissionStore.status.status"
      :color="submissionStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ submissionStore.status.message }}
    </NotificationBar>

    <!-- List Section -->
    <CardBox
      title="Submissions List"
      :hasTable="true"
      :icon="mdiBallot"
    >
      
    <Table 
      :data="submissionStore.list"
      @select-submission="select"
    />
  
    </CardBox>
  </SectionMain>

</template>
