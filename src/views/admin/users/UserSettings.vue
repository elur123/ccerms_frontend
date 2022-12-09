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

import Create from '@/views/admin/users/components/Create.vue'
import Update from '@/views/admin/users/components/Update.vue'
import Table from '@/views/admin/users/components/Table.vue'

import { useResearcharchiveStore } from '@/stores/admin/researcharchives.js';
import { useUserStore } from '@/stores/admin/users.js';
import { useCourseStore } from '@/stores/admin/course.js';


const titleStack = ref(['Admin', 'Settings', 'Users'])

const userStore = useUserStore()
const courseStore = useCourseStore()

const showCreateSection = ref(false)
const showUpdateSection = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

// Notification Hide Function
const hideNotification = () => {
  userStore.status.status = true
}

// Get Data
userStore.fetch()


// Show Create function
const showCreate = () => {
  showCreateSection.value = true
  showUpdateSection.value = false
}

const userCreate = (res) => {
  if (res.status) {
    userStore.list = res.list
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

const userUpdate = (res) => {
  if (res.status) {
    userStore.list = res.list
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

// Show Only List Section
const showListSection = () => {
  showCreateSection.value = false
  showUpdateSection.value = false

  userStore.clear()
}

// Select Course item function
const select = (item) => {
  showUpdateSection.value = true
  showCreateSection.value = false
  userStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  userStore.select(item)
}



</script>

<template>
  <!-- Delete Modal -->
  <CardBoxModal
    v-model="modalShowDelete"
    large-title="Delete Milestone"
    button="danger"
    buttonLabel="Confirm"
    @confirm="milestoneStore.destroy()"
    has-cancel
  >
  </CardBoxModal>

  <SectionTitleBar :title-stack="titleStack" />

  <SectionMain>

    <NotificationBar
      v-if="!userStore.status.status"
      :isDismissed="userStore.status.status"
      :color="userStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ userStore.status.message }}
    </NotificationBar>

    <!-- Create Section -->
    <Create 
      v-if="showCreateSection"
      @back="showListSection" 
      @userCreate="userCreate"
    />

    <!-- Update Section -->
    <Update 
      v-if="showUpdateSection"
      :course="courseStore.list"
      :item="userStore.request"
      @back="showListSection" 
      @userUpdate="userUpdate"
    />

    <!-- List Section -->
    <CardBox
      v-if="!showCreateSection && !showUpdateSection"
      title="Users List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >
      
    <Table 
      :data="userStore.list"
      @select-user="select"
      @destroy-user="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
