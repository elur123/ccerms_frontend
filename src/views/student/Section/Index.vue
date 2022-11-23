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
  import SectionTable from '@/views/student/components/SectionTable.vue'

  import {
    useStudentDetailsStore
  } from '@/stores/student/details.js';
  import {
    useAuthStore
  } from '@/stores/auth.js'

  const titleStack = ref(['Student', 'General', 'Sections'])

  const studentDetails = useStudentDetailsStore()
  const authStore = useAuthStore()

  studentDetails.fetch(authStore.user.id)

</script>

<template>

  <SectionTitleBar :title-stack="titleStack" />
  <SectionMain>
    <CardBox
      title="Enrolled Sections"
      :hasTable="true"
    >
      
      <SectionTable 
        :data="studentDetails.section_list"
      />
  
    </CardBox>
  </SectionMain>

</template>
