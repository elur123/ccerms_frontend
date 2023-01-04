<script setup>
import { ref, reactive } from 'vue'
import { mdiBallot, mdiPlus, mdiTableBorder } from '@mdi/js'

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
import { customAlert } from '@/alert.js'
import CourseTable from '@/views/admin/course/components/CourseTable.vue'

import { useCourseStore } from '@/stores/admin/course.js';
import { useLayoutStore } from '@/stores/layout.js'

const titleStack = ref(['Admin', 'Settings', 'Courses'])

const courseStore = useCourseStore()
const layoutStore = useLayoutStore()

const modalShowCreate = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

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

  layoutStore.showLoading = true
  courseStore.create().then(() => {

    customAlert('success', 'Successfully created!')
    layoutStore.showLoading = false
  }).catch(() => {

    customAlert('warning', 'Server error!')
    layoutStore.showLoading = false
  })
}

// Update function
const update = () => {
  
  layoutStore.showLoading = true
  courseStore.update().then(() => {

    customAlert('success', 'Successfully updated!')
    layoutStore.showLoading = false
  }).catch(() => {

    customAlert('warning', 'Server error!')
    layoutStore.showLoading = false
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
