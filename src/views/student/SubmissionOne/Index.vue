<script setup>
import { ref, reactive, computed } from 'vue'
import { mdiBallot, mdiPlus, mdiTableBorder, mdiArrowLeftBold } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import NotificationBar from '@/components/NotificationBar.vue'

import Create from '@/views/student/SubmissionOne/components/Create.vue'
import Table from '@/views/student/SubmissionOne/components/Table.vue'


import { useStudentDetailsStore } from '@/stores/student/details.js';
import { useSubmissionOneStore } from '@/stores/student/submissionone.js'
import { useAuthStore } from '@/stores/auth.js'

//variables 
const titleStack = ref(['Student', 'Events', 'Submissions', 'Capstone 1'])
const showSubmission = ref(false);
const showCreate = ref(false);
const milestoneDetails = ref(null);

// State
const studentDetails = useStudentDetailsStore();
const submissinOne = useSubmissionOneStore();
const authStore = useAuthStore();

// Computed functions

// On load functions
studentDetails.fetch(authStore.user.id)

// Functions
const hideNotification = () => {
  submissinOne.status.status = true
}

const select_milestone = (milestone) => {

  if(studentDetails.details.group.onemilestone_order < milestone.id) return false;

  submissinOne.fetch(studentDetails.details.group.id, milestone.id)
  showSubmission.value = true
  milestoneDetails.value = milestone

  submissinOne.request.group = studentDetails.details.group.id
  submissinOne.request.milestone = milestone.id
  submissinOne.request.submitted_by = studentDetails.details.user_id
}

const back_milestone_list = () => {
  showSubmission.value = false
  showCreate.value = false
  milestoneDetails.value = null
}

const show_create = () => {
  showCreate.value = !showCreate.value
}

const submit = (res) => {
  if (res.status) {
    submissinOne.submissions = res.list
    showCreate.value = false
  }
}

</script>

<template>

  <SectionTitleBar :title-stack="titleStack" />
  <SectionMain>

    <NotificationBar
      v-if="!submissinOne.status.status"
      :isDismissed="submissinOne.status.status"
      :color="submissinOne.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ submissinOne.status.message }}
    </NotificationBar>

    <div v-if="!showSubmission" class="grid grid-cols-1 md:grid-cols-3 gap-3">

        <CardBox
          class="uppercase"
          :class="studentDetails.details.group.onemilestone_order >= milestone.id ? 'cursor-pointer' : 'cursor-not-allowed'"
          :headerBg="studentDetails.details.group.onemilestone_order >= milestone.id ? 'bg-yellow-400' : 'bg-gray-400' "
          v-for="milestone in studentDetails.onemilestones"
          :key="milestone.id"
          :title="milestone.milestone"
          @click="select_milestone(milestone)"
        > 
            <h3 class="font-bold text-center" v-if="studentDetails.details.group.onemilestone_order > milestone.id">Done</h3>
            <h3 class="font-bold text-center" v-if="studentDetails.details.group.onemilestone_order == milestone.id">Ongoing</h3>
            <h3 class="font-bold text-center" v-if="studentDetails.details.group.onemilestone_order < milestone.id">Pending</h3>
        </CardBox>

    </div>

    <div v-if="showSubmission">
        
        <div class="flex gap-5 items-center">

          <BaseIcon 
            class="cursor-pointer" 
            :path="mdiArrowLeftBold" 
            @click="back_milestone_list"
          />

          <h3 class="text-3xl font-semibold uppercase py-2">{{ milestoneDetails.milestone }}</h3>

        </div>

        <Create 
          :advisers="studentDetails.details.group.advisers"
          :panels="studentDetails.details.group.panels"
          :rcs="studentDetails.details.group.rcs"
          v-if="showCreate"
          @back="show_create"
          @submit="submit"
        />
        
        <CardBox
          v-if="!showCreate"
          title="Submission List"
          :hasTable="true"
          :icon="mdiBallot"
          :headerIcon="studentDetails.details.group.onemilestone_order == milestoneDetails.id ? mdiPlus : null" 
          @header-icon-click="show_create"
        >
          
          <Table 
            :data="submissinOne.submissions"
          />
      
        </CardBox>

    </div>

  </SectionMain>

</template>
