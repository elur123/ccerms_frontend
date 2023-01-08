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

import Create from '@/views/admin/minutesetup/components/Create.vue'
import Update from '@/views/admin/minutesetup/components/Update.vue'
import Table from '@/views/admin/minutesetup/components/Table.vue'

import { useMinuteStore } from '@/stores/admin/minute.js';

const titleStack = ref(['Admin', 'Events', 'Minute Setup'])

const minuteStore = useMinuteStore()

const showCreateSchedule = ref(false)
const showUpdateSchedule = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

// Notification Hide Function
const hideNotification = () => {
  minuteStore.status.status = true
}

// Get Data
minuteStore.fetch()


// Show Create function
const showCreate = () => {
  showCreateSchedule.value = true
  showUpdateSchedule.value = false
  minuteStore.clear()
}

const minuteCreate = (res) => {
  if (res.status) {
    minuteStore.list = res.list
    showCreateSchedule.value = false
    showUpdateSchedule.value = false
  }
}

const minuteUpdate = (res) => {
  if (res.status) {
    minuteStore.list = res.list
    showCreateSchedule.value = false
    showUpdateSchedule.value = false
  }
}

// Show Only List Section
const showListSection = () => {
  showCreateSchedule.value = false
  showUpdateSchedule.value = false
}

// Select Course item function
const select = (item) => {
  showUpdateSchedule.value = true
  showCreateSchedule.value = false
  minuteStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  minuteStore.select(item)
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

    <!-- Create Section -->
    <Create 
      v-if="showCreateSchedule"
      @back="showListSection" 
      @minuteCreate="minuteCreate"
    />

    <!-- Update Section -->
    <Update 
      v-if="showUpdateSchedule"
      @back="showListSection" 
      @minuteUpdate="minuteUpdate"
    />

    <!-- List Section -->
    <CardBox
      v-if="!showCreateSchedule && !showUpdateSchedule"
      title="Minute Setup List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >
      
    <Table 
      :data="minuteStore.list"
      @select-section="select"
      @destroy-section="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
