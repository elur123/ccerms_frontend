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

import Create from '@/views/admin/students/components/Create.vue'
import Update from '@/views/admin/students/components/Update.vue'
import Table from '@/views/admin/students/components/Table.vue'

import { useCourseStore } from '@/stores/admin/course.js';
import { useStudentStore } from '@/stores/admin/students.js';


const titleStack = ref(['Admin', 'General', 'Students'])

const courseStore = useCourseStore()
const studentStore = useStudentStore()

const showCreateSection = ref(false)
const showUpdateSection = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

// Notification Hide Function
const hideNotification = () => {
  studentStore.status.status = true
}

// Get Data
courseStore.fetch()
studentStore.fetch()

// Show Create function
const showCreate = () => {
  showCreateSection.value = true
  showUpdateSection.value = false
}

const userCreate = (res) => {
  if (res.status) {
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

const userUpdate = (res) => {
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
  studentStore.clear()
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

    <!-- Create Section -->
    <Create 
      v-if="showCreateSection"
      :courses="courseStore.list"
      @back="showListSection" 
      @userCreate="userCreate"
    />

    <!-- Update Section -->
    <Update 
      v-if="showUpdateSection"
      :courses="courseStore.list"
      :item="studentStore.request"
      @back="showListSection" 
      @userUpdate="userUpdate"
    />

    <!-- List Section -->
    <CardBox
      v-if="!showCreateSection && !showUpdateSection"
      title="Students List"
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
