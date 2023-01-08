<script setup>
import { ref, reactive, onMounted } from 'vue'
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

import Create from '@/views/admin/schedules/components/Create.vue'
import Update from '@/views/admin/schedules/components/Update.vue'
import Minute from '@/views/admin/schedules/components/Minute.vue'
import Table from '@/views/admin/schedules/components/Table.vue'

import { useScheduleStore } from '@/stores/admin/schedules.js';
import { useUserStore  } from '@/stores/admin/users.js';
import { useGroupStore  } from '@/stores/admin/groups.js';
import { useScheduleTypeStore  } from '@/stores/admin/scheduletype.js';
import { useAuthStore } from '@/stores/auth'

const titleStack = ref(['Admin', 'Events', 'Defense Schedules'])

const scheduleStore = useScheduleStore()
const userStore = useUserStore()
const groupStore = useGroupStore()
const scheduletypeStore = useScheduleTypeStore()
const authStore = useAuthStore()

const showCreateSchedule = ref(false)
const showUpdateSchedule = ref(false)
const showMinuteSchedule = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)


// Get Data
onMounted(() => {

  scheduleStore.fetch()
  userStore.fetchAvailable()
  groupStore.fetch()
  scheduletypeStore.fetch()

  scheduleStore.minute.prepared = authStore.user.id
})

// Show Create function
const showCreate = () => {
  showCreateSchedule.value = true
  showUpdateSchedule.value = false
  scheduleStore.clear()
}

const scheduleCreate = (res) => {
  if (res.status) {
    scheduleStore.list = res.list
    showCreateSchedule.value = false
    showUpdateSchedule.value = false
    showMinuteSchedule.value = false
  }
}

const scheduleUpdate = (res) => {
  if (res.status) {
    scheduleStore.list = res.list
    showCreateSchedule.value = false
    showUpdateSchedule.value = false
  }
}

// Show Only List Section
const showListSection = () => {
  showCreateSchedule.value = false
  showUpdateSchedule.value = false
  showMinuteSchedule.value = false
}

// Select Course item function
const select = (item) => {
  showUpdateSchedule.value = true
  showCreateSchedule.value = false
  scheduleStore.select(item)
}

// Select Course item function
const selectMinute = (item) => {
  showMinuteSchedule.value = true
  showUpdateSchedule.value = false
  showCreateSchedule.value = false

  scheduleStore.minute.id = null
  scheduleStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  scheduleStore.select(item)
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
      :teachers="userStore.subjectteacher_available"
      :groups="groupStore.list"
      :scheduleTypes="scheduletypeStore.list"
      @back="showListSection" 
      @scheduleCreate="scheduleCreate"
    />

    <!-- Update Section -->
    <Update 
      v-if="showUpdateSchedule"
      :groups="groupStore.list"
      :scheduleTypes="scheduletypeStore.list"
      @back="showListSection" 
      @scheduleUpdate="scheduleUpdate"
    />

    <!-- Minute Section -->
    <Minute 
      v-if="showMinuteSchedule"
      :teachers="userStore.subjectteacher_available"
      :groups="groupStore.list"
      :scheduleTypes="scheduletypeStore.list"
      @back="showListSection" 
      @scheduleCreate="scheduleCreate"
    />

    <!-- List Section -->
    <CardBox
      v-if="!showCreateSchedule && !showUpdateSchedule && !showMinuteSchedule"
      title="Schedules List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >
      
    <Table 
      :data="scheduleStore.list"
      @select-section="select"
      @select-minute="selectMinute"
      @destroy-section="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
