<script setup>
import { ref, reactive, computed } from 'vue'
import { mdiBallot, mdiPlus, mdiTableBorder, mdiArrowLeftBold } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import NotificationBar from '@/components/NotificationBar.vue'

import Create from '@/views/student/SubmissionOne/components/Create.vue'
import Update from '@/views/student/SubmissionOne/components/Update.vue'
import Table from '@/views/student/SubmissionOne/components/Table.vue'
import Comments from '@/views/student/SubmissionOne/components/Comments.vue'


import { useStudentDetailsStore } from '@/stores/student/details.js';
import { useSubmissionOneStore } from '@/stores/student/submissionone.js'
import { useAuthStore } from '@/stores/auth.js'

//variables 
const titleStack = ref(['Student', 'Events', 'Submissions', 'Capstone 1'])
const showSubmission = ref(false);
const showCreate = ref(false);
const showUpdate = ref(false);
const showComments = ref(false);
const showDelete = ref(false);
const milestoneDetails = ref(null);
const submissionDetails = ref(null);

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
}

const back_milestone_list = () => {
  showSubmission.value = false
  showCreate.value = false
  showUpdate.value = false
  milestoneDetails.value = null
}

const show_create = () => {
  showCreate.value = !showCreate.value

  submissinOne.request.group = studentDetails.details.group.id
  submissinOne.request.milestone = milestoneDetails.value.id
  submissinOne.request.submitted_by = studentDetails.details.user_id
}

const show_update = () => {
  showUpdate.value = !showUpdate.value

  submissinOne.request.group = studentDetails.details.group.id
  submissinOne.request.milestone = milestoneDetails.value.id
  submissinOne.request.submitted_by = studentDetails.details.user_id
  submissinOne.request.submitted_to = ''
  submissinOne.request.notes = ''
}

const submit = (res) => {
  if (res.status) {
    submissinOne.submissions = res.list
    showCreate.value = false
    showUpdate.value = false
  }
}

const select_submission = (item) => {
  submissinOne.select(item);
  showUpdate.value = true;
  showCreate.value = false;
  submissinOne.request.submitted_by = studentDetails.details.user_id
}

const show_submission = (item) => {
  submissinOne.select(item);
  showComments.value = true
  showUpdate.value = false;
  showCreate.value = false;
  submissionDetails.value = item
  submissinOne.request.submitted_by = studentDetails.details.user_id
}

const delete_submission = (item) => {
  showDelete.value = true
  submissinOne.select(item)
}

const localDelete = () => {
  let find = submissinOne.submissions.find(e => e.id == submissinOne.request.id);
  let index = submissinOne.submissions.indexOf(find);

  if (find != undefined) {
    submissinOne.submissions.splice(index, 1);
    submissinOne.delete()
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

    <!-- Delete Modal -->
    <CardBoxModal
        v-model="showDelete"
        large-title="Delete entry..."
        button="warning"
        buttonLabel="Delete"
        @confirm="localDelete()"
    >

        <h4 class="text-center"> Click Delete to remove from list... </h4>

    </CardBoxModal>

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
          v-if="showCreate & (!showComments && !showUpdate)"
          @back="show_create"
          @submit="submit"
        />

        <Update 
          :advisers="studentDetails.details.group.advisers"
          :panels="studentDetails.details.group.panels"
          :rcs="studentDetails.details.group.rcs"
          v-if="showUpdate & (!showCreate && !showComments)"
          @back="show_update"
          @submit="submit"
        />

        <Comments
          :submissionDetails="submissionDetails"
          v-if="showComments & (!showCreate && !showUpdate)"
          @back="show_update"
          @submit="submit"
        />
        
        <CardBox
          v-if="!showCreate && !showUpdate && !showComments"
          title="Submission List"
          :hasTable="true"
          :icon="mdiBallot"
          :headerIcon="studentDetails.details.group.onemilestone_order == milestoneDetails.id ? mdiPlus : null" 
          @header-icon-click="show_create"
        >
          
          <Table 
            @select-submission="select_submission"
            @show-submission="show_submission"
            @delete-submission="delete_submission"
            :data="submissinOne.submissions"
          />
      
        </CardBox>

    </div>

  </SectionMain>

</template>
