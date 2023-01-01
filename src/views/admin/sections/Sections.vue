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
import Update from '@/views/admin/sections/components/Update.vue'
import Table from '@/views/admin/sections/components/Table.vue'

import { useSectionStore } from '@/stores/admin/sections.js';
import { useUserStore  } from '@/stores/admin/users.js';
import { useStudentStore  } from '@/stores/admin/students.js';
import { useGroupStore  } from '@/stores/admin/groups.js';
import { customAlert } from '@/alert.js'

const titleStack = ref(['Admin', 'General', 'Sections'])

const sectionStore = useSectionStore()
const userStore = useUserStore()
const studentStore = useStudentStore()
const groupStore = useGroupStore()

const showCreateSection = ref(false)
const showUpdateSection = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

// Get Data
sectionStore.fetch()
userStore.fetchAvailable()
studentStore.fetchSectionAvailable()
groupStore.fetch()

// Notification Hide Function
const hideNotification = () => {
  sectionStore.status.status = true
}

// Show Create function
const showCreate = () => {
  showCreateSection.value = true
  showUpdateSection.value = false
  sectionStore.clear()
}

const addStudent = (student) => {

    const index = studentStore.section_available.indexOf(student);
    studentStore.section_available[index].is_available = false
}

const removeStudent = (student) => {
  
    const index = studentStore.section_available.indexOf(student);
    studentStore.section_available[index].is_available = true
}

const addGroup = (group) => {

    const index = groupStore.section_available.indexOf(group);
    groupStore.section_available[index].is_available = false
}

const removeGroup = (group) => {
  
    const index = groupStore.section_available.indexOf(group);
    studentStore.section_available[index].is_available = true
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
      :teachers="userStore.subjectteacher_available"
      :students="studentStore.section_available"
      :groups="groupStore.section_available"
      @back="showListSection" 
      @addStudent="addStudent"
      @removeStudent="removeStudent"
      @addGroup="addGroup"
      @removeGroup="removeGroup"
      @sectionCreate="sectionCreate"
    />

    <!-- Update Section -->
    <Update 
      v-if="showUpdateSection"
      :teachers="userStore.subjectteacher_available"
      :students="studentStore.section_available"
      :groups="groupStore.section_available"
      @back="showListSection" 
      @addStudent="addStudent"
      @removeStudent="removeStudent"
      @addGroup="addGroup"
      @removeGroup="removeGroup"
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
      @select-section="select"
      @destroy-section="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
