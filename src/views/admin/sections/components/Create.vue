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

import { useSectionStore } from '@/stores/admin/sections.js';
import { groupTypes, years_list, semesters } from '@/settings_data.js';
import { useLayoutStore } from '@/stores/layout.js'

const sectionStore = useSectionStore()
const layoutStore = useLayoutStore()

// Emits
const emit = defineEmits(['back', 'addStudent', 'removeStudent', 'addGroup', 'removeGroup', 'sectionCreate'])

// Variables
const isShowModal = ref(false);
const accountType = ref('');
const titleModal = ref('');
const fullname = ref('');
const groupname = ref('');
const isShowDeleteModal = ref(false);
const accountIndex = ref(null)


// Props
const props = defineProps({
  teachers: {
    type: Array,
    default: []
  },
  students: {
    type: Array,
    default: []
  },
  groups: {
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

const filtered_students = computed(() => {
    return props.students.filter(student => student.fullname.toLowerCase().includes(fullname.value.toLowerCase()))
})

const filtered_groups = computed(() => {
    return props.groups.filter(group => group.groupname.toLowerCase().includes(groupname.value.toLowerCase()))
})

// Declared Functions
const back = () => {
    emit('back', false);
}

const sectionCreate = () => {

    layoutStore.showLoading = true
    sectionStore.create().then(res => {

        customAlert('success', 'Successfully created!')
        emit('sectionCreate', { status: true, list: res.data.sections });
        layoutStore.showLoading = false
    }).catch(() => {

        customAlert('warning', 'Check field required !')
        emit('sectionCreate', { status: false});
        layoutStore.showLoading = false
    })
}

const showModal = (type) => {
    accountType.value = type
    titleModal.value = 'Add ' + type
    isShowModal.value = true
    fullname.value = ''
}

const addStudent = (student) => {

    emit('addStudent', student);
    sectionStore.request.student.push(student)
}

const addGroup = (group) => {

    emit('addGroup', group);
    sectionStore.request.group.push(group)
}

const showModalDelete = (index, type) => {
    accountIndex.value = index
    accountType.value = type
    isShowDeleteModal.value = true
}

const localDelete = () => {
    if (accountType.value == 'student') {
        
        let student = sectionStore.request.student[accountIndex.value]
        emit('removeStudent', student);
        
        sectionStore.request.student.splice(accountIndex.value, 1)
    }

    else {
        
        let group = sectionStore.request.group[accountIndex.value]
        emit('removeGroup', group);
        
        sectionStore.request.group.splice(accountIndex.value, 1)
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
        buttonLabel="Close"
    >

        <FormField v-if="accountType == 'Student'" label="Search Student name">
            <FormControl v-model="fullname"/>
        </FormField>

        <FormField v-else label="Search groupname">
            <FormControl v-model="groupname"/>
        </FormField>

        <BaseDivider />
        
        
        <ul v-if="accountType == 'Student'" class="h-[350px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4" v-for="student in filtered_students" :key="student.id">
                <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {{ student.fullname }}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {{ student.email }}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white px-2">
                        <BaseButton
                            v-if="student.is_available"
                            label="Add"
                            color="light"
                            @click="addStudent(student)"
                        />
                        <span v-else>Added</span>
                    </div>
                </div>
            </li>
        </ul>

        <ul v-else class="h-[350px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4" v-for="group in filtered_groups" :key="group.id">
                <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {{ group.groupname }}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white px-2">
                        <BaseButton
                            v-if="group.is_available"
                            label="Add"
                            color="light"
                            @click="addGroup(group)"
                        />
                        <span v-else>Added</span>
                    </div>
                </div>
            </li>
        </ul>


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
      title="Create Section"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3">

            <div class="grid grid-cols-1 md:grid-cols-2">

                <FormField label="Section Code">
                    <FormControl v-model="sectionStore.request.section_code"/>
                </FormField>

            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <FormField label="Semester">
                    <FormControl
                        v-model="sectionStore.request.user"
                        :options="semesters"
                    />
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
                        @header-icon-click="showModal('Student')"
                    >
                        <div class="flex justify-center">
                            <ul class="bg-white rounded-lg w-96 text-gray-900">
                                <li v-for="(member, index) in sectionStore.request.student" :key="member.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                                    <p>{{ member.fullname }}</p>
                                    <BaseIcon
                                        :path="mdiTrashCan"
                                        class="cursor-pointer mr-3"
                                        @click="showModalDelete(index, 'student')"
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
                        @header-icon-click="showModal('Group')"
                    >
                        <div class="flex justify-center">
                            <ul class="bg-white rounded-lg w-96 text-gray-900">
                                <li v-for="(group, index) in sectionStore.request.group" :key="group.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                                    <p>{{ group.groupname }}</p>
                                    <BaseIcon
                                        :path="mdiTrashCan"
                                        class="cursor-pointer mr-3"
                                        @click="showModalDelete(index, 'group')"
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
                @click="sectionCreate()"
            />
        </BaseButtons>

    </CardBox>
</template>