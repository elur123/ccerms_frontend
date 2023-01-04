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

import Create from '@/views/admin/sections/components/Create.vue'
import Update from '@/views/admin/sections/components/Update.vue'
import Table from '@/views/admin/sections/components/Table.vue'

import { useSectionStore } from '@/stores/admin/sections.js';
import { useUserStore  } from '@/stores/admin/users.js';
import { useStudentStore  } from '@/stores/admin/students.js';
import { useGroupStore  } from '@/stores/admin/groups.js';

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
    
    const find = studentStore.section_available.find(e => e.id == student.id)
    const index = studentStore.section_available.indexOf(find);
    studentStore.section_available[index].is_available = false
}

const removeStudent = (student) => {

    const find = studentStore.section_available.find(e => e.id == student.id)
    const index = studentStore.section_available.indexOf(find);
    studentStore.section_available[index].is_available = true
}

const addGroup = (group) => {

    const find = groupStore.section_available.find(e => e.id == group.id)
    const index = groupStore.section_available.indexOf(find);
    groupStore.section_available[index].is_available = false
}

const removeGroup = (group) => {

    const find = groupStore.section_available.find(e => e.id == group.id)
    const index = groupStore.section_available.indexOf(find);
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

  item.sectionstudent.forEach(val => {
    addStudent(val)
  })

  item.sectiongroup.forEach(val => {
    addGroup(val)
  })

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
