<script setup>
import { ref, reactive, computed } from 'vue'
import { mdiBallot, mdiPlus, mdiTableBorder, mdiArrowLeftBold } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { customAlert } from '@/alert.js'

import Create from '@/views/student/SubmissionTwo/components/Create.vue'
import Update from '@/views/student/SubmissionTwo/components/Update.vue'
import Table from '@/views/student/SubmissionTwo/components/Table.vue'
import Comments from '@/views/student/SubmissionTwo/components/Comments.vue'


import { useStudentDetailsStore } from '@/stores/student/details.js';
import { useSubmissionTwoStore } from '@/stores/student/submissiontwo.js'
import { useAuthStore } from '@/stores/auth.js'

//variables 
const titleStack = ref(['Student', 'Events', 'Submissions', 'Capstone 2'])
const showSubmission = ref(false);
const showCreate = ref(false);
const showUpdate = ref(false);
const showComments = ref(false);
const showDelete = ref(false);
const milestoneDetails = ref(null);
const submissionDetails = ref(null);

// State
const studentDetails = useStudentDetailsStore();
const submissionTwo = useSubmissionTwoStore();
const authStore = useAuthStore();

// Computed functions

// On load functions
studentDetails.fetch(authStore.user.id)

// Functions
const hideNotification = () => {
  submissionTwo.status.status = true
}

const select_milestone = (milestone) => {

  if(studentDetails.details.group.twomilestone_order < milestone.id) return false;

  submissionTwo.fetch(studentDetails.details.group.id, milestone.id)
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

  submissionTwo.request.group = studentDetails.details.group.id
  submissionTwo.request.milestone = milestoneDetails.value.id
  submissionTwo.request.submitted_by = studentDetails.details.user_id
}

const show_update = () => {
  showUpdate.value = !showUpdate.value

  submissionTwo.request.group = studentDetails.details.group.id
  submissionTwo.request.milestone = milestoneDetails.value.id
  submissionTwo.request.submitted_by = studentDetails.details.user_id
  submissionTwo.request.submitted_to = ''
  submissionTwo.request.notes = ''
}

const show_comment = () => {
  showComments.value = !showComments.value

  submissionTwo.request.group = studentDetails.details.group.id
  submissionTwo.request.milestone = milestoneDetails.value.id
  submissionTwo.request.submitted_by = studentDetails.details.user_id
  submissionTwo.request.submitted_to = ''
  submissionTwo.request.notes = ''
  submissionTwo.request.comment.user = ''
}

const submit = (res) => {
  if (res.status) {
    submissionTwo.submissions = res.list
    showCreate.value = false
    showUpdate.value = false
  }
}

const post_comment = (res) => {
  if (res.status) {
    const index = submissionTwo.submissions.indexOf(submissionTwo.submissions.find(e => e.id == submissionDetails.id));
    submissionTwo.submissions[index].comments = res.data.comments
    submissionTwo.submissions.comments = res.list
    showComments.value = true
    showCreate.value = false
    showUpdate.value = false
  }
}

const select_submission = (item) => {
  submissionTwo.select(item);
  showUpdate.value = true;
  showCreate.value = false;
  submissionTwo.request.submitted_by = studentDetails.details.user_id
}

const show_submission = (item) => {
  submissionTwo.select(item);
  showComments.value = true
  showUpdate.value = false;
  showCreate.value = false;
  submissionDetails.value = item
  submissionTwo.request.comment.file = {}
  submissionTwo.request.comment.user = studentDetails.details.user_id
}

const delete_submission = (item) => {
  showDelete.value = true
  submissionTwo.select(item)
}

const localDelete = () => {
  let find = submissionTwo.submissions.find(e => e.id == submissionTwo.request.id);
  let index = submissionTwo.submissions.indexOf(find);

  if (find != undefined) {

    customAlert('success', 'Successfully deleted!')
    submissionTwo.submissions.splice(index, 1);
    submissionTwo.delete()
  }
}

</script>

<template>

  <SectionTitleBar :title-stack="titleStack" />
  <SectionMain>

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
          :class="studentDetails.details.group.twomilestone_order >= milestone.id ? 'cursor-pointer' : 'cursor-not-allowed'"
          :headerBg="studentDetails.details.group.twomilestone_order >= milestone.id ? 'bg-yellow-400' : 'bg-gray-400' "
          v-for="milestone in studentDetails.twomilestones"
          :key="milestone.id"
          :title="milestone.milestone"
          @click="select_milestone(milestone)"
        > 
            <h3 class="font-bold text-center" v-if="studentDetails.details.group.twomilestone_order > milestone.id">Done</h3>
            <h3 class="font-bold text-center" v-if="studentDetails.details.group.twomilestone_order == milestone.id">Ongoing</h3>
            <h3 class="font-bold text-center" v-if="studentDetails.details.group.twomilestone_order < milestone.id">Pending</h3>
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
          @back="show_comment"
          @submit="post_comment"
        />
        
        <CardBox
          v-if="!showCreate && !showUpdate && !showComments"
          title="Submission List"
          :hasTable="true"
          :icon="mdiBallot"
          :headerIcon="studentDetails.details.group.twomilestone_order == milestoneDetails.id ? mdiPlus : null" 
          @header-icon-click="show_create"
        >
          
          <Table 
            @select-submission="select_submission"
            @show-submission="show_submission"
            @delete-submission="delete_submission"
            :data="submissionTwo.submissions"
          />
      
        </CardBox>

    </div>

  </SectionMain>

</template>
