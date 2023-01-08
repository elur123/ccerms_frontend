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

import { useMinuteStore } from '@/stores/admin/minute.js';
import { groupTypes, years_list, status } from '@/settings_data.js';
import { useLayoutStore } from '@/stores/layout.js'

const minuteStore = useMinuteStore()
const layoutStore = useLayoutStore()

// Emits
const emit = defineEmits(['back', 'minuteCreate'])

// Variables
const isShowModal = ref(false);
const accountType = ref('');
const titleModal = ref('');
const label = ref('');
const label_order = ref('');
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
const list_ordered = computed(() => {

    return minuteStore.request.list.sort((a,b) => a.label_order - b.label_order)
})
 
// Declared Functions
const back = () => {
    emit('back', false);
}

const minuteCreate = () => {

    layoutStore.showLoading = true
    minuteStore.create().then(res => {
        
        customAlert('success', 'Successfully created!')
        emit('minuteCreate', { status: true, list: res.data.minutes });
        layoutStore.showLoading = false
    }).catch(() => {

        customAlert('warning', 'Check field required !')
        emit('minuteCreate', { status: false});
        layoutStore.showLoading = false
    })
}

const showModal = (type) => {
    accountType.value = type
    titleModal.value = 'Add ' + type
    isShowModal.value = true
    label.value = ''
    label_order.value = ''
}

const localCreate = () => {
    let find = minuteStore.request.list.find(e => e.label_order == label_order.value)

    if(label.value == '') {
        customAlert('warning', 'Label field required !')
        return true;
    }

    if(label_order.value == '') {
        customAlert('warning', 'Label order field required !')
        return true;
    }

    if(find != undefined) {
        customAlert('warning', 'Label order already set!')
        return true;
    }

    minuteStore.request.list.push({
        id: null,
        label: label.value,
        label_order: label_order.value
    })

     customAlert('success', 'Successfully added!')
}

const showModalDelete = (minute, type) => {
    accountIndex.value = minuteStore.request.list.indexOf(minute)
    accountType.value = type
    isShowDeleteModal.value = true
}

const localDelete = () => {
    
    minuteStore.request.list.splice(accountIndex.value, 1)
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

        <FormField label="Label">
            <FormControl v-model="label"/>
        </FormField>

         <FormField label="Order Label">
            <FormControl v-model="label_order" type="number"/>
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
      title="Create Minute"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <FormField label="Title">
                    <FormControl v-model="minuteStore.request.title"/>
                </FormField>
            </div>

            <hr>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <CardBox 
                        title="Comments and Suggestions Label"
                        :headerIcon="mdiPlus"
                        @header-icon-click="showModal('Comments and Suggestions Label')"
                    >
                        <div class="flex align-center">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Order</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(min, index) in list_ordered" :key="index">
                                        <td>{{ min.label }}</td>
                                        <td>{{ min.label_order }}</td>
                                        <td>
                                            <BaseIcon
                                                :path="mdiTrashCan"
                                                class="cursor-pointer mr-3"
                                                @click="showModalDelete(min, 'member')"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                @click="minuteCreate()"
            />
        </BaseButtons>

    </CardBox>
</template>