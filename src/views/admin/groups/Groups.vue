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

import Create from '@/views/admin/groups/components/Create.vue'
import Update from '@/views/admin/groups/components/Update.vue'
import Table from '@/views/admin/groups/components/Table.vue'

import { useCourseStore } from '@/stores/admin/course.js';
import { useGroupStore } from '@/stores/admin/groups.js';
import { useMilestoneOneStore } from '@/stores/admin/milestoneone.js';
import { useMilestoneTwoStore } from '@/stores/admin/milestonetwo.js';
import { useStudentStore } from '@/stores/admin/students.js';
import { useUserStore } from '@/stores/admin/users.js';


const titleStack = ref(['Admin', 'General', 'Groups'])

const courseStore = useCourseStore()
const groupStore = useGroupStore()
const milestoneOne = useMilestoneOneStore()
const milestoneTwo = useMilestoneTwoStore()
const studentStore = useStudentStore()
const userStore = useUserStore()

const showCreateSection = ref(false)
const showUpdateSection = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

// Notification Hide Function
const hideNotification = () => {
  groupStore.status.status = true
}

// Get Data
courseStore.fetch()
groupStore.fetch()
milestoneOne.fetch()
milestoneTwo.fetch()
studentStore.fetchAvailable()
userStore.fetchAvailable()

// Show Create function
const showCreate = () => {
  showCreateSection.value = true
  showUpdateSection.value = false
}

const groupCreate = (res) => {
  if (res.status) {
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

const groupUpdate = (res) => {
  if (res.status) {
    groupStore.list = res.list
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

// Show Only List Section
const showListSection = () => {
  showCreateSection.value = false
  showUpdateSection.value = false
  groupStore.clear()
}

// Select Course item function
const select = (item) => {
  showUpdateSection.value = true
  showCreateSection.value = false
  groupStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  groupStore.select(item)
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
      v-if="!groupStore.status.status"
      :isDismissed="groupStore.status.status"
      :color="groupStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ groupStore.status.message }}
    </NotificationBar>

    <!-- Create Section -->
    <Create 
      v-if="showCreateSection"
      :courses="courseStore.list"
      :milestoneOne="milestoneOne.list"
      :milestoneTwo="milestoneTwo.list"
      @back="showListSection" 
      @groupCreate="groupCreate"
    />

    <!-- Update Section -->
    <Update 
      v-if="showUpdateSection"
      :courses="courseStore.list"
      :milestoneOne="milestoneOne.list"
      :milestoneTwo="milestoneTwo.list"
      @back="showListSection" 
      @groupUpdate="groupUpdate"
    />

    <!-- List Section -->
    <CardBox
      v-if="!showCreateSection && !showUpdateSection"
      title="Groups List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >
      
    <Table 
      :data="groupStore.list"
      @select-group="select"
      @destroy-group="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
