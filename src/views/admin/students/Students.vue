<script setup>
import { ref, reactive } from 'vue'
import { createPinia } from 'pinia'
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

import Create from '@/views/admin/students/components/Create.vue'
import Update from '@/views/admin/students/components/Update.vue'
import Table from '@/views/admin/students/components/Table.vue'

import { useStudentStore } from '@/stores/admin/students.js';

const pinia = createPinia()

const titleStack = ref(['Admin', 'General', 'Students'])

const studentStore = useStudentStore(pinia)

const showCreateSection = ref(false)
const showUpdateSection = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

// Notification Hide Function
const hideNotification = () => {
  studentStore.status.status = true
}

// Get Data
studentStore.fetch()


// Show Create function
const showCreate = () => {
  showCreateSection.value = true
  showUpdateSection.value = false
}

const userCreate = (res) => {
  if (res.status) {
    studentStore.list = res.list
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

const archivesUpdate = (res) => {
  if (res.status) {
    studentStore.list = res.list
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

// Show Only List Section
const showListSection = () => {
  showCreateSection.value = false
  showUpdateSection.value = false
}

// Select Course item function
const select = (item) => {
  showUpdateSection.value = true
  showCreateSection.value = false
  studentStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  studentStore.select(item)
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
      v-if="!studentStore.status.status"
      :isDismissed="studentStore.status.status"
      :color="studentStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ studentStore.status.message }}
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
      :item="studentStore.request"
      @back="showListSection" 
      @archivesUpdate="archivesUpdate"
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
      :data="studentStore.list"
      @select-student="select"
      @destroy-student="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
