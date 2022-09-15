<script setup>
import { ref, reactive } from 'vue'
import { createPinia } from 'pinia'
import { mdiBallot, mdiPlus, mdiTableBorder } from '@mdi/js'
import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import CourseTable from '@/views/admin/course/components/CourseTable.vue'

import { useCourseStore } from '@/stores/admin/course.js';

const pinia = createPinia()

const titleStack = ref(['Admin', 'Settings', 'Courses'])

const courseStore = useCourseStore(pinia)

const modalShowCreate = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

const loading = useLoading();

// Get Data
courseStore.fetch()

// Show Create function
const showCreate = () => {
  modalShowCreate.value = true
  courseStore.id = ''
  courseStore.course = ''
}

// Select Course item function
const select = (item) => {
  modalShowUpdate.value = true
  courseStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  courseStore.select(item)
}

// Create function
const create = () => {
  loading.show()
  courseStore.create().then(() => {
    loading.hide()
  }).catch(() => {
    loading.hide()
  })
}

// Update function
const update = () => {
  loading.show()
  courseStore.update().then(() => {
    loading.hide()
  }).catch(() => {
    loading.hide()
  })
}

// Notification Hide Function
const hideNotification = () => {
  courseStore.status.status = true
}

</script>

<template>
  <CardBoxModal
    v-model="modalShowCreate"
    large-title="Create Course"
    button="success"
    buttonLabel="Create"
    @confirm="create()"
  >
    <FormField label="Course Title">
      <FormControl
        v-model="courseStore.course"
      />
    </FormField>
  </CardBoxModal>

  <CardBoxModal
    v-model="modalShowUpdate"
    title="Update Course"
    buttonLabel="Update"
    @confirm="update()"
  >
    <FormField label="Course Title">
      <FormControl
        v-model="courseStore.course"
      />
    </FormField>
  </CardBoxModal>

  <CardBoxModal
    v-model="modalShowDelete"
    large-title="Delete Course"
    button="danger"
    buttonLabel="Confirm"
    @confirm="courseStore.destroy()"
    has-cancel
  >
    <p><b>Confirm</b> to delete course <b>{{ courseStore.course.toUpperCase() }}</b></p>
  </CardBoxModal>

  <SectionTitleBar :title-stack="titleStack" />

  <SectionMain>
    <NotificationBar
      v-if="!courseStore.status.status"
      :isDismissed="courseStore.status.status"
      :color="courseStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ courseStore.status.message }}
    </NotificationBar>
    <CardBox
      title="Courses List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >
      
      <CourseTable 
        :data="courseStore.list"
        @select-course="select"
        @destroy-course="selectDelete"
      />
  
    </CardBox>
  </SectionMain>

</template>
