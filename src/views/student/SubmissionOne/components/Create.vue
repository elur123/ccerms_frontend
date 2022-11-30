<script setup>
import { ref, computed, inject } from 'vue'


import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormControl from '@/components/FormControl.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
import { mdiArrowLeftBold, mdiPlus, mdiTrashCan, mdiTableBorder } from '@mdi/js'

import { useSubmissionOneStore } from '@/stores/student/submissionone.js';

const submissionOne = useSubmissionOneStore()

// Emits
const emit = defineEmits(['back', 'submit'])

// Props
const props = defineProps({
  advisers: {
    type: Array,
    default: []
  },
  panels: {
    type: Array,
    default: []
  },
  rcs: {
    type: Array,
    default: []
  }
})

// Variables
const isShowDeleteModal = ref(false);
const accountIndex = ref(null)
const loading = inject('Loader')

// Computed Functions
const personnels = computed(() => {
    
    var data = [];

    const advisers = props.advisers.map(adviser => ({ id: adviser.id, label: `${adviser.firstname} ${adviser.firstname} ${adviser.lastname} (Adviser)` }))

    const panels = props.panels.map(panel => ({ id: panel.id, label: `${panel.firstname} ${panel.firstname} ${panel.lastname} (Panel)` }))

    const rcs = props.rcs.map(rc => ({ id: rc.id, label: `${rc.firstname} ${rc.firstname} ${rc.lastname} (RC)` }))

    data = data.concat(advisers)
    data = data.concat(panels)
    data = data.concat(rcs)

    return data;
})

// Declared Functions
const back = () => {
    emit('back', false);
}

const submit = () => {
    loading.show()
    submissionOne.create().then(res => {
        loading.hide()
        emit('submit', { status: true, list: res.data.submissions });
    }).catch(() => {
        loading.hide()
        emit('submit', { status: false});
    })
}

const showModalDelete = (index, type) => {
    accountIndex.value = index
    accountType.value = type
    isShowDeleteModal.value = true
}

// Notification Hide Function
const hideNotification = () => {
  submissionOne.status.status = true
}


</script>
<template>
    <CardBox
      title="Create New Submission"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3">
            <NotificationBarInCard color="light">
                <span class="font-bold">Student Details.</span>
            </NotificationBarInCard>

            <div class="grid grid-cols-1">
                <FormField label="Document">
                    <FormFilePicker v-model="submissionOne.request.file"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Send to">
                    <FormControl v-model="submissionOne.request.submitted_to" :options="personnels"/>
                </FormField>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField label="Notes">
                    <FormControl v-model="submissionOne.request.notes" type="textarea"/>
                </FormField>
            </div>
            
        </div>

        <BaseDivider />
        <BaseButtons>
            <BaseButton
                label="Submit"
                color="info"
                @click="submit()"
            />
        </BaseButtons>

    </CardBox>
</template>