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
import CourseTable from '@/views/admin/scheduletype/components/Table.vue'

import { useScheduleTypeStore } from '@/stores/admin/scheduletype.js';

const pinia = createPinia()

const titleStack = ref(['Admin', 'Settings', 'Schedule Type'])

const scheduleTypeStore = useScheduleTypeStore(pinia)

const modalShowCreate = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

const loading = useLoading();

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
  loading.show()
  scheduleTypeStore.create().then(() => {
    loading.hide()
  }).catch(() => {
    loading.hide()
  })
}

// Update function
const update = () => {
  loading.show()
  scheduleTypeStore.update().then(() => {
    loading.hide()
  }).catch(() => {
    loading.hide()
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
    <NotificationBar
      v-if="!scheduleTypeStore.status.status"
      :isDismissed="scheduleTypeStore.status.status"
      :color="scheduleTypeStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ scheduleTypeStore.status.message }}
    </NotificationBar>
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
