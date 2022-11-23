<script setup>
  import {
    ref,
    reactive
  } from 'vue'
  import {
    mdiBallot,
    mdiPlus,
    mdiTableBorder
  } from '@mdi/js'

  import SectionMain from '@/components/SectionMain.vue'
  import SectionTitleBar from '@/components/SectionTitleBar.vue'
  import CardBox from '@/components/CardBox.vue'
  import Table from '@/views/student/SubmissionOne/components/Table.vue'

  import {
    useStudentDetailsStore
  } from '@/stores/student/details.js';
  import {
    useAuthStore
  } from '@/stores/auth.js'

  const titleStack = ref(['Student', 'Events', 'Submissions', 'Capstone 1'])

  const studentDetails = useStudentDetailsStore()
  const authStore = useAuthStore()

  studentDetails.fetch(authStore.user.id)

</script>

<template>

  <SectionTitleBar :title-stack="titleStack" />
  <SectionMain>
    <CardBox
      title="Submission List"
      :hasTable="true"
    >
      
      <Table 
        :data="studentDetails.schedules"
      />
  
    </CardBox>
  </SectionMain>

</template>
