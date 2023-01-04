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
import CourseTable from '@/views/admin/scheduletype/components/Table.vue'
import { customAlert } from '@/alert.js'

import { useScheduleTypeStore } from '@/stores/admin/scheduletype.js';
import { useLayoutStore } from '@/stores/layout.js'

const titleStack = ref(['Admin', 'Settings', 'Schedule Type'])

const scheduleTypeStore = useScheduleTypeStore()
const layoutStore = useLayoutStore()

const modalShowCreate = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

// Get Data
scheduleTypeStore.fetch()

// Show Create function
const showCreate = () => {
  modalShowCreate.value = true
  scheduleTypeStore.id = ''
  scheduleTypeStore.type = ''
}

// Select Course item function
const select = (item) => {
  modalShowUpdate.value = true
  scheduleTypeStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  scheduleTypeStore.select(item)
}

// Create function
const create = () => {

  layoutStore.showLoading = true
  scheduleTypeStore.create().then(() => {

    customAlert('success', 'Successfully created!')
    layoutStore.showLoading = false
  }).catch(() => {

    customAlert('warning', 'Check field required!')
    layoutStore.showLoading = false
  })
}

// Update function
const update = () => {
 
  layoutStore.showLoading = true
  scheduleTypeStore.update().then(() => {

    customAlert('success', 'Successfully created!')
    layoutStore.showLoading = false
  }).catch(() => {

    customAlert('warning', 'Check field required!')
    layoutStore.showLoading = false
  })
}

// Notification Hide Function
const hideNotification = () => {
  scheduleTypeStore.status.status = true
}


</script>

<template>
  <CardBoxModal
    v-model="modalShowCreate"
    large-title="Create Schedule Type"
    button="success"
    buttonLabel="Create"
    @confirm="create()"
  >
    <FormField label="Schedule Type">
      <FormControl
        v-model="scheduleTypeStore.type"
      />
    </FormField>
  </CardBoxModal>

  <CardBoxModal
    v-model="modalShowUpdate"
    title="Update Schedule Type"
    buttonLabel="Update"
    @confirm="update()"
  >
    <FormField label="Schedule Type">
      <FormControl
        v-model="scheduleTypeStore.type"
      />
    </FormField>
  </CardBoxModal>

  <CardBoxModal
    v-model="modalShowDelete"
    large-title="Delete Course"
    button="danger"
    buttonLabel="Confirm"
    @confirm="scheduleTypeStore.destroy()"
    has-cancel
  >
    <p><b>Confirm</b> to delete course <b>{{ scheduleTypeStore.type.toUpperCase() }}</b></p>
  </CardBoxModal>

  <SectionTitleBar :title-stack="titleStack" />

  <SectionMain>

    <CardBox
      title="Schedule Type List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >
      
    <CourseTable 
      :data="scheduleTypeStore.list"
      @select-course="select"
      @destroy-course="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
