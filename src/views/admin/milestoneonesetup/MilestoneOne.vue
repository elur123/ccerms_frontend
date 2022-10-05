<script setup>
import { ref, reactive, inject } from 'vue'
import { mdiBallot, mdiPlus, mdiTableBorder } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import FormField from '@/components/FormField.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import MilestoneOneTable from '@/views/admin/milestoneonesetup/components/Table.vue'

import { useMilestoneOneStore } from '@/stores/admin/milestoneone.js';


const titleStack = ref(['Admin', 'Settings', 'Milestone One'])

const milestoneStore = useMilestoneOneStore()

const modalShowCreate = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

const loading = inject('Loader')

// Notification Hide Function
const hideNotification = () => {
  milestoneStore.status.status = true
}

// Get Data
milestoneStore.fetch()

// Document type
const selectOptions = [
  { id: 1, label: 'Document Type' },
  { id: 2, label: 'Form Type' }
]

// Show Create function
const showCreate = () => {
  modalShowCreate.value = true
  milestoneStore.request = {
      id: '',
      milestone: '',
      file: [],
      milestone_type: '',
      percent: '',
      ordernumber: '', 
  }
}

// Select Course item function
const select = (item) => {
  modalShowUpdate.value = true
  milestoneStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  milestoneStore.select(item)
}

// Create function
const create = () => {
  loading.show()
  milestoneStore.create().then(() => {
    loading.hide()
  }).catch(() => {
    loading.hide()
  })
}

// Update function
const update = () => {
  loading.show()
  milestoneStore.update().then(() => {
    loading.hide()
  }).catch(() => {
    loading.hide()
  })
}


</script>

<template>
  <!-- Create Modal -->
  <CardBoxModal
    v-model="modalShowCreate"
    large-title="Create Milestone"
    button="success"
    buttonLabel="Create"
    @confirm="create()"
  >
    <FormField label="Milestone Title">
      <FormControl
        v-model="milestoneStore.request.milestone"
      />
    </FormField>

    <FormField label="Document File">
      <FormFilePicker
        v-model="milestoneStore.request.file"
      />
    </FormField>

    <FormField label="Type">
      <FormControl
        v-model="milestoneStore.request.milestone_type"
        :options="selectOptions"
      />
    </FormField>

    <FormField label="Percent">
      <FormControl
        v-model="milestoneStore.request.percent"
        type="number"
      />
    </FormField>

    <FormField label="Order" help="Enter order number">
      <FormControl
        v-model="milestoneStore.request.ordernumber"
        type="number"
      />
    </FormField>

  </CardBoxModal>

  <!-- Update Modal -->
  <CardBoxModal
    v-model="modalShowUpdate"
    title="Update Milestone"
    buttonLabel="Update"
    @confirm="update()"
  >
     <FormField label="Milestone Title">
      <FormControl
        v-model="milestoneStore.request.milestone"
      />
    </FormField>

    <FormField label="Document File">
      <FormFilePicker
        v-model="milestoneStore.request.file"
      />
    </FormField>

    <FormField label="Type">
      <FormControl
        v-model="milestoneStore.request.milestone_type"
        :options="selectOptions"
      />
    </FormField>

    <FormField label="Percent">
      <FormControl
        v-model="milestoneStore.request.percent"
        type="number"
      />
    </FormField>

    <FormField label="Order" help="Enter order number">
      <FormControl
        v-model="milestoneStore.request.ordernumber"
        type="number"
      />
    </FormField>

  </CardBoxModal>

  <!-- Delete Modal -->
  <CardBoxModal
    v-model="modalShowDelete"
    large-title="Delete Milestone"
    button="danger"
    buttonLabel="Confirm"
    @confirm="milestoneStore.destroy()"
    has-cancel
  >
    <!-- <p><b>Confirm</b> to delete course <b>{{ milestoneStore.milestone.toUpperCase() }}</b></p> -->
  </CardBoxModal>

  <SectionTitleBar :title-stack="titleStack" />

  <SectionMain>

    <NotificationBar
      v-if="!milestoneStore.status.status"
      :isDismissed="milestoneStore.status.status"
      :color="milestoneStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ milestoneStore.status.message }}
    </NotificationBar>

    <CardBox
      title="Milestone One List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >
      
      <MilestoneOneTable 
        :data="milestoneStore.list"
        @select-course="select"
        @destroy-course="selectDelete"
      />
  
    </CardBox>
  </SectionMain>

</template>
