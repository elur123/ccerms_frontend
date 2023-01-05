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

import Comments from '@/views/admin/submissiontwo/components/Comments.vue'
import Table from '@/views/admin/submissiontwo/components/Table.vue'

import { useSubmissionTwoStore } from '@/stores/admin/submissiontwo.js';
import { useAuthStore } from '@/stores/auth.js'

// Variables
const titleStack = ref(['Admin', 'Events', 'Capstone Two Submissions'])
const submissionDetails = ref(null);
const showComments = ref(false);

const submissionStore = useSubmissionTwoStore()
const authStore = useAuthStore()


// Notification Hide Function
const hideNotification = () => {
  submissionStore.status.status = true
}

// Get Data
submissionStore.fetch(authStore.user.id)


// functions
const back = () => {
  showComments.value = !showComments.value
}

const select = (item) => {
  submissionDetails.value = item
  submissionStore.request.status = item.status_id
  submissionStore.request.user = authStore.user.id
  back()
}

const post_comment = (res) => {
  const index = submissionStore.list.indexOf(submissionStore.list.find(e => e.id == submissionDetails.value.id))
  submissionDetails.value = submissionStore.list[index]
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />

  <SectionMain>

    <Comments
      :submissionDetails="submissionDetails"
      v-if="showComments"
      @back="back"
      @comment="post_comment"
    />

    <!-- List Section -->
    <CardBox
      v-if="!showComments"
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
