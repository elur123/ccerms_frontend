<script setup>
import { ref, reactive } from 'vue'
import { mdiBallot, mdiPlus, mdiTableBorder } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'

import { useStudentDetailsStore } from '@/stores/student/details.js';
import { useAuthStore } from '@/stores/auth.js'

const titleStack = ref(['Student', 'General', 'Group'])

const studentDetails = useStudentDetailsStore()
const authStore = useAuthStore()

studentDetails.fetch(authStore.user.id)

</script>

<template>

  <SectionTitleBar :title-stack="titleStack" />

  <SectionMain>
    <div class="container mx-auto">

    </div>
  </SectionMain>

</template>
