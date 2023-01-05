<script setup>
import { ref, reactive, } from 'vue'
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
import MilestoneTwoTable from '@/views/admin/milestonetwosetup/components/Table.vue'
import { customAlert } from '@/alert.js'

import { useMilestoneTwoStore } from '@/stores/admin/milestonetwo.js';
import { useLayoutStore } from '@/stores/layout.js'


const titleStack = ref(['Admin', 'Settings', 'Milestone Two'])

const milestoneStore = useMilestoneTwoStore()
const layoutStore = useLayoutStore()

const modalShowCreate = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)

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

  layoutStore.showLoading = true
  milestoneStore.create().then(() => {
    
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
  milestoneStore.update().then(() => {
    
    customAlert('success', 'Successfully updated!')
    layoutStore.showLoading = false
  }).catch(() => {

    customAlert('warning', 'Check field required!')
    layoutStore.showLoading = false
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

    <CardBox
      title="Milestone Two List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >
      
    <MilestoneTwoTable 
      :data="milestoneStore.list"
      @select-course="select"
      @destroy-course="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
