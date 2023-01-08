<script setup>
import { ref, computed } from 'vue'

import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormControl from '@/components/FormControl.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { customAlert } from '@/alert.js'

import { mdiArrowLeftBold, mdiPlus, mdiTrashCan, mdiTableBorder } from '@mdi/js'

import { useScheduleStore } from '@/stores/admin/schedules.js';
import { useMinuteStore } from '@/stores/admin/minute.js'
import { useLayoutStore } from '@/stores/layout.js'

const scheduleStore = useScheduleStore()
const minuteStore = useMinuteStore()
const layoutStore = useLayoutStore()

minuteStore.fetch()

// Emits
const emit = defineEmits(['back', 'scheduleCreate'])

// Variables
const temp_minute = ref(null)

// Props
const props = defineProps({})

// Computed
const filtered_minute = computed(() => {

    return minuteStore.list.map(function(m) {

        return {
            id: m.id,
            label: m.title
        }
    })
})
 
// Declared Functions
const back = () => {
    emit('back', false);
}

const changeMinute = () => {

    temp_minute.value = minuteStore.list.find(e => e.id == scheduleStore.minute.id)

    scheduleStore.minute.list = temp_minute.value.lists.map(function(e) {

        return {
            id: e.id,
            label: e.label,
            label_order: e.label_order,
            comment: ''
        }
    })

    scheduleStore.minute.list.sort((a, b) => a.label_order - b.label_order)
}

const scheduleCreateMinute = () => {

    layoutStore.showLoading = true
    scheduleStore.create_minute().then(res => {
        
        customAlert('success', 'Successfully created!')
        emit('scheduleCreate', { status: true, list: res.data.schedules });
        layoutStore.showLoading = false
    }).catch(() => {

        customAlert('warning', 'Check field required !')
        emit('scheduleCreate', { status: false});
        layoutStore.showLoading = false
    })
}


</script>
<template>

    <CardBox
      title="Minute Schedule"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3">
            
            <div v-if="!scheduleStore.hasMinute" class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <FormField label="Select Minute Setup">
                    <FormControl
                        v-model="scheduleStore.minute.id"
                        :options="filtered_minute"
                        @change="changeMinute"
                    />
                </FormField>
            </div>

            <hr v-if="!scheduleStore.hasMinute">

            <CardBox 
                v-if="scheduleStore.minute.group"
                title="Title of the study"
            >
                {{ scheduleStore.minute.group.title }}
            </CardBox>

            <CardBox 
                title="Comments and Suggestions"
            >
                <table v-if="temp_minute && !scheduleStore.hasMinute">
                    <tbody>
                        <tr v-for="label in scheduleStore.minute.list" :key="label.id">
                            <td>{{ label.label }}</td>
                            <td>
                                <FormControl type="textarea" v-model="label.comment"/>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table v-if="scheduleStore.hasMinute">
                    <tbody>
                        <tr v-for="label in scheduleStore.minute.list" :key="label.id">
                            <td>{{ label.label }}</td>
                            <td>
                                <FormControl type="textarea" v-model="label.comment"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </CardBox>

        </div>

        <BaseDivider />
        <BaseButtons>
            <BaseButton
                label="Create"
                color="info"
                @click="scheduleCreateMinute()"
            />
        </BaseButtons>

    </CardBox>
</template>