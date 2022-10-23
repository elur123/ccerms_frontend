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

import Create from '@/views/admin/sections/components/Create.vue'
import Update from '@/views/admin/researcharchives/components/Update.vue'
import Table from '@/views/admin/sections/components/Table.vue'

import { useSectionStore } from '@/stores/admin/sections.js';
import { useMilestoneTwoStore } from '@/stores/admin/milestonetwo.js';
import { useCourseStore } from '@/stores/admin/course.js';

const titleStack = ref(['Admin', 'General', 'Sections'])

const sectionStore = useSectionStore()
const courseStore = useCourseStore()

const showCreateSection = ref(false)
const showUpdateSection = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

// Notification Hide Function
const hideNotification = () => {
  sectionStore.status.status = true
}

// Get Data
sectionStore.fetch()
courseStore.fetch()


// Show Create function
const showCreate = () => {
  showCreateSection.value = true
  showUpdateSection.value = false
}

const sectionCreate = (res) => {
  if (res.status) {
    sectionStore.list = res.list
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

const sectionUpdate = (res) => {
  if (res.status) {
    sectionStore.list = res.list
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
  sectionStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  sectionStore.select(item)
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
      v-if="!sectionStore.status.status"
      :isDismissed="sectionStore.status.status"
      :color="sectionStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ sectionStore.status.message }}
    </NotificationBar>

    <!-- Create Section -->
    <Create 
      v-if="showCreateSection"
      @back="showListSection" 
      @sectionCreate="sectionCreate"
    />

    <!-- Update Section -->
    <Update 
      v-if="showUpdateSection"
      :item="sectionStore.request"
      @back="showListSection" 
      @sectionUpdate="sectionUpdate"
    />

    <!-- List Section -->
    <CardBox
      v-if="!showCreateSection && !showUpdateSection"
      title="Sections List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >
      
    <Table 
      :data="sectionStore.list"
      @select-archive="select"
      @destroy-archive="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
