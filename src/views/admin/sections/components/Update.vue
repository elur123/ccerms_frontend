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

import { mdiArrowLeftBold, mdiPlus, mdiTrashCan, mdiTableBorder } from '@mdi/js'

import { useSectionStore } from '@/stores/admin/sections.js';
import { groupTypes, years_list } from '@/settings_data.js';

const sectionStore = useSectionStore()

// Emits
const emit = defineEmits(['back', 'sectionUpdate'])

// Variables
const isShowModal = ref(false);
const accountType = ref('');
const titleModal = ref('');
const fullname = ref('');
const isShowDeleteModal = ref(false);
const accountIndex = ref(null)

const loading = inject('Loader')

// Props
const props = defineProps({
  teachers: {
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

// Declared Functions
const back = () => {
    emit('back', false);
}

const sectionUpdate = () => {
    loading.show()
    sectionStore.update().then(res => {
        loading.hide()
        emit('sectionUpdate', { status: true, list: res.data.sections });
    }).catch(() => {
        loading.hide()
        emit('sectionUpdate', { status: false});
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
    if (accountType.value == 'member') {
        sectionStore.request.member.push({
            id: null,
            fullname: fullname.value
        })
    }
    else if (accountType.value == 'adviser') {
        sectionStore.request.adviser.push({
            id: null,
            fullname: fullname.value
        })
    }
    else {
        sectionStore.request.panel.push({
            id: null,
            fullname: fullname.value
        })
    }
}

const showModalDelete = (index, type) => {
    accountIndex.value = index
    accountType.value = type
    isShowDeleteModal.value = true
}

const localDelete = () => {
    if (accountType.value == 'member') {
        sectionStore.request.member.splice(accountIndex, 1)
    }
    else if (accountType.value == 'adviser') {
        sectionStore.request.adviser.splice(accountIndex, 1)
    }
    else {
        sectionStore.request.panel.splice(accountIndex, 1)
    }
}

// Notification Hide Function
const hideNotification = () => {
  sectionStore.status.status = true
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
      title="Update Section"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Section Code">
                    <FormControl v-model="sectionStore.request.section_code"/>
                </FormField>

                <FormField label="Section Type">
                    <FormControl
                        v-model="sectionStore.request.grouptype"
                        :options="groupTypes"
                    />
                </FormField>

                <FormField label="Room">
                    <FormControl v-model="sectionStore.request.room_number"/>
                </FormField>

                <FormField label="Professor">
                    <FormControl
                        v-model="sectionStore.request.user"
                        :options="teachers"
                    />
                </FormField>

                <FormField label="From Time">
                    <FormControl v-model="sectionStore.request.from_time" type="time"/>
                </FormField>

                <FormField label="To Time">
                    <FormControl v-model="sectionStore.request.to_time" type="time"/>
                </FormField>

                <FormField label="From Year">
                    <FormControl v-model="sectionStore.request.from_year" 
                        :options="years_list"
                    />
                </FormField>

                <FormField label="To Year">
                    <FormControl v-model="sectionStore.request.to_year"
                        :options="years_list"
                    />
                </FormField>
            </div>

            <hr>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <CardBox 
                        title="Students"
                        :headerIcon="mdiPlus"
                        @header-icon-click="showModal('member')"
                    >
                        <div class="flex justify-center">
                            <ul class="bg-white rounded-lg w-96 text-gray-900">
                                <li v-for="(member, index) in sectionStore.request.student" :key="member.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                                    <p>{{ `${member.user.lastname}, ${member.user.firstname}` }}</p>
                                    <BaseIcon
                                        :path="mdiTrashCan"
                                        class="cursor-pointer mr-3"
                                        @click="showModalDelete(index, 'member')"
                                    />
                                </li>
                            </ul>
                        </div>
                    </CardBox>
                </div>
                <div>
                    <CardBox 
                        title="Groups"
                        :headerIcon="mdiPlus"
                        @header-icon-click="showModal('adviser')"
                    >
                        <div class="flex justify-center">
                            <ul class="bg-white rounded-lg w-96 text-gray-900">
                                <li v-for="(adviser, index) in sectionStore.request.adviser" :key="adviser.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                                    <p>{{ adviser.fullname }}</p>
                                    <BaseIcon
                                        :path="mdiTrashCan"
                                        class="cursor-pointer mr-3"
                                        @click="showModalDelete(index, 'adviser')"
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
                label="Update"
                color="info"
                @click="sectionUpdate()"
            />
        </BaseButtons>

    </CardBox>
</template>