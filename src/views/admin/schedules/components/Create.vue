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
import { groupTypes, years_list, status } from '@/settings_data.js';
import { useLayoutStore } from '@/stores/layout.js'

const scheduleStore = useScheduleStore()
const layoutStore = useLayoutStore()

// Emits
const emit = defineEmits(['back', 'scheduleCreate'])

// Variables
const isShowModal = ref(false);
const accountType = ref('');
const titleModal = ref('');
const fullname = ref('');
const isShowDeleteModal = ref(false);
const accountIndex = ref(null)

// Props
const props = defineProps({
  teachers: {
    type: Array,
    default: []
  },
  groups: {
    type: Array,
    default: []
  },
  scheduleTypes: {
    type: Array,
    default: []
  }
})

// Computed
const teachers = computed(() => {
   return props.teachers.map(item => {
        return {
            'id': item.id,
            'label': item.fullname
        }
   })
})

const groupTypesFiltered = computed(() => {
    return groupTypes.filter(e => e.id < 3)
})

const capstoneOne = computed(() => {
    var data = [];
    
    data = props.groups.map(item => {
        return {
            'id': item.id,
            'label': item.groupname,
            'type_id': item.type_id,
            'panel': item.panel
        }
    })

    data = data.filter(e => e.type_id == 1)

    return data
})

const capstoneTwo = computed(() => {
    var data = [];
    
    data = props.groups.map(item => {
        return {
            'id': item.id,
            'label': item.groupname,
            'type_id': item.type_id,
            'panel': item.panel
        }
    })

    data = data.filter(e => e.type_id == 2)

    return data
})

const scheduleTypes = computed(() => {
    return props.scheduleTypes.map(item => {
        return {
            'id': item.id,
            'label': item.type
        }
    })
})

const statusFiltered = computed(() => {
    return status.filter(e => e.id >= 4 && e.id <= 8)
})
 
// Declared Functions
const back = () => {
    emit('back', false);
}

const scheduleCreate = () => {

    layoutStore.showLoading = true
    scheduleStore.create().then(res => {
        
        customAlert('success', 'Successfully created!')
        emit('scheduleCreate', { status: true, list: res.data.schedules });
        layoutStore.showLoading = false
    }).catch(() => {

        customAlert('warning', 'Check field required !')
        emit('scheduleCreate', { status: false});
        layoutStore.showLoading = false
    })
}

const showModal = (type) => {
    accountType.value = type
    titleModal.value = 'Add ' + type
    isShowModal.value = true
    fullname.value = ''
}

const localCreate = () => {
    if(fullname.value == '') {
        alert('Fullname required')
        return;
    }
    
    scheduleStore.request.panels.push({
        id: null,
        fullname: fullname.value,
        is_create: true
    })
}

const showModalDelete = (index) => {
    accountIndex.value = index
    isShowDeleteModal.value = true
}

const localDelete = () => {
    scheduleStore.request.panels.splice(accountIndex.value, 1)
}

const changeGroup = (type) => {
    const index = type == 1 ? capstoneOne.value.indexOf(capstoneOne.value.find(e => e.id == scheduleStore.request.group)) 
    : capstoneOne.value.indexOf(capstoneTwo.value.find(e => e.id == scheduleStore.request.group))

    const panels = type == 1 ? capstoneOne.value[index].panel : capstoneTwo.value[index].panel

    scheduleStore.request.panels = panels.map(item => {
        return {
            id: item.user.id,
            fullname: `${item.user.firstname} ${item.user.middlename} ${item.user.lastname}`,
            is_create: true
        }
    })
}

// Notification Hide Function
const hideNotification = () => {
  scheduleStore.status.status = true
}


</script>
<template>
    <!-- Add Modal -->
    <CardBoxModal
        v-model="isShowModal"
        :large-title="titleModal"
        button="success"
        buttonLabel="Add    "
        @confirm="localCreate()"
    >

        <FormField label="Fullname">
            <FormControl v-model="fullname"/>
        </FormField>

    </CardBoxModal>

    <!-- Delete Modal -->
    <CardBoxModal
        v-model="isShowDeleteModal"
        large-title="Delete entry..."
        button="warning"
        buttonLabel="Delete"
        @confirm="localDelete()"
    >

        <h4 class="text-center"> Click Delete to remove from list... </h4>

    </CardBoxModal>

    <CardBox
      title="Create Schedule"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Schedule Date">
                    <FormControl v-model="scheduleStore.request.date" type="date"/>
                </FormField>

                <FormField label="Schedule Venue">
                    <FormControl v-model="scheduleStore.request.venue"/>
                </FormField>

                <FormField label="Group Type">
                    <FormControl
                        v-model="scheduleStore.request.grouptype"
                        :options="groupTypesFiltered"
                    />
                </FormField>

                <FormField label="Group">
                    <FormControl
                        v-model="scheduleStore.request.group"
                        :options="scheduleStore.request.grouptype == 1 || scheduleStore.request.grouptype == '' ? capstoneOne : capstoneTwo"
                        @change="changeGroup(1)"
                    />
                </FormField>

                <FormField label="From Time">
                    <FormControl v-model="scheduleStore.request.from_time" type="time"/>
                </FormField>

                <FormField label="To Time">
                    <FormControl v-model="scheduleStore.request.to_time" type="time"/>
                </FormField>

                <FormField label="Schedule Type">
                    <FormControl
                        v-model="scheduleStore.request.scheduletype"
                        :options="scheduleTypes"
                    />
                </FormField>

                <FormField label="Status">
                    <FormControl
                        v-model="scheduleStore.request.status"
                        :options="statusFiltered"
                    />
                </FormField>
            </div>

            <hr>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <CardBox 
                        title="Panels"
                        :headerIcon="mdiPlus"
                        @header-icon-click="showModal('Panel')"
                    >
                        <div class="flex justify-center">
                            <ul class="bg-white rounded-lg w-96 text-gray-900">
                                <li v-for="(pan, index) in scheduleStore.request.panels" :key="index" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                                    <p>{{ pan.fullname }}</p>
                                    <BaseIcon
                                        :path="mdiTrashCan"
                                        class="cursor-pointer mr-3"
                                        @click="showModalDelete(index)"
                                    />
                                </li>
                            </ul>
                        </div>
                    </CardBox>
                </div>
            </div>

        </div>

        <BaseDivider />
        <BaseButtons>
            <BaseButton
                label="Create"
                color="info"
                @click="scheduleCreate()"
            />
        </BaseButtons>

    </CardBox>
</template>