<script setup>
import { ref, reactive, onMounted } from 'vue'
import { mdiBallot, mdiPlus, mdiTableBorder } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import FormField from '@/components/FormField.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'

import Create from '@/views/admin/researcharchives/components/Create.vue'
import Update from '@/views/admin/researcharchives/components/Update.vue'
import Table from '@/views/admin/researcharchives/components/Table.vue'

import { useResearcharchiveStore } from '@/stores/admin/researcharchives.js';
import { useMilestoneTwoStore } from '@/stores/admin/milestonetwo.js';
import { useCourseStore } from '@/stores/admin/course.js';

const titleStack = ref(['Admin', 'Settings', 'Research Archives'])

const researchStore = useResearcharchiveStore()
const courseStore = useCourseStore()

const showCreateSection = ref(false)
const showUpdateSection = ref(false)
const modalShowUpdate = ref(false)
const modalShowDelete = ref(false)
const search_research = ref('')

// Notification Hide Function
const hideNotification = () => {
  researchStore.status.status = true
}

// Get Data
onMounted(() => {
  researchStore.fetch('', 1)
  courseStore.fetch()
}) 

// Search Research function
const searchResearch = () => {
  researchStore.fetch(search_research.value, 1)
}

// Show Create function
const showCreate = () => {
  showCreateSection.value = true
  showUpdateSection.value = false
}

const archivesCreate = (res) => {
  if (res.status) {
    researchStore.list = res.list
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

const archivesUpdate = (res) => {
  if (res.status) {
    researchStore.list = res.list
    showCreateSection.value = false
    showUpdateSection.value = false
  }
}

// Show Only List Section
const showListSection = () => {
  showCreateSection.value = false
  showUpdateSection.value = false
}

// Select Course item function
const select = (item) => {
  showUpdateSection.value = true
  showCreateSection.value = false
  researchStore.select(item)
}

// Select Course item to delete function
const selectDelete = (item) => {
  modalShowDelete.value = true
  researchStore.select(item)
}



</script>

<template>
  <!-- Delete Modal -->
  <CardBoxModal
    v-model="modalShowDelete"
    large-title="Delete Milestone"
    button="danger"
    buttonLabel="Confirm"
    @confirm="milestoneStore.destroy()"
    has-cancel
  >
  </CardBoxModal>

  <SectionTitleBar :title-stack="titleStack" />

  <SectionMain>

    <!-- Create Section -->
    <Create 
      v-if="showCreateSection"
      :course="courseStore.list"
      @back="showListSection" 
      @archivesCreate="archivesCreate"
    />

    <!-- Update Section -->
    <Update 
      v-if="showUpdateSection"
      :course="courseStore.list"
      :item="researchStore.request"
      @back="showListSection" 
      @archivesUpdate="archivesUpdate"
    />

    <!-- List Section -->
    <CardBox
      v-if="!showCreateSection && !showUpdateSection"
      title="Research Archives List"
      :hasTable="true"
      :icon="mdiBallot"
      :headerIcon="mdiPlus" 
      @header-icon-click="showCreate()"
    >

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-3 w-full">
        <input class="w-full border-b border-b-1 border-0 focus:outline-none focus:ring-0 focus:border-yellow-400 focus:border-b-2" 
          type="text" 
          placeholder="Hit enter to search research..."
          v-model="search_research"
          @keyup.enter="searchResearch"
        >
      </div>
    </div>
      
    <Table 
      :data="researchStore.list"
      :search="search_research"
      @select-archive="select"
      @destroy-archive="selectDelete"
    />
  
    </CardBox>
  </SectionMain>

</template>
