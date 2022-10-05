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

import { useStudentStore } from '@/stores/admin/students.js';
import { userTypes, gender, status, groupTypes } from '@/settings_data.js';

const studentStore = useStudentStore()

// Emits
const emit = defineEmits(['back', 'userUpdate'])

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
  courses: {
    type: Array,
    default: []
  },
  item: {
    type: Object,
    default: null
  }
})

const courses_list = computed(() => {
    const data = []
    props.courses.forEach(element => {
        data.push({
            id: element.id,
            label: element.course
        })
    });

    return data
}) 

// Declared Functions
const back = () => {
    emit('back', false);
}

const userUpdate = () => {
    loading.show()
    studentStore.update().then(res => {
        loading.hide()
        emit('userUpdate', { status: true, list: res.data.students });
    }).catch(() => {
        loading.hide()
        emit('userUpdate', { status: false});
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
        studentStore.request.member.push({
            id: null,
            fullname: fullname.value
        })
    }
    else if (accountType.value == 'adviser') {
        studentStore.request.adviser.push({
            id: null,
            fullname: fullname.value
        })
    }
    else {
        studentStore.request.panel.push({
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
        studentStore.request.member.splice(accountIndex, 1)
    }
    else if (accountType.value == 'adviser') {
        studentStore.request.adviser.splice(accountIndex, 1)
    }
    else {
        studentStore.request.panel.splice(accountIndex, 1)
    }
}

// Notification Hide Function
const hideNotification = () => {
  studentStore.status.status = true
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

    <!-- <NotificationBar
      v-if="!studentStore.status.status"
      :isDismissed="studentStore.status.status"
      :color="studentStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ studentStore.status.message }}
    </NotificationBar> -->

    <CardBox
      title="Update Student"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3">
            <NotificationBarInCard color="light">
                <span class="font-bold">Student Details.</span>
            </NotificationBarInCard>

            <div class="grid grid-cols-1 md:grid-cols-2">
                <FormField label="Profile Picture">
                    <FormFilePicker v-model="studentStore.request.file"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField label="Firstname">
                    <FormControl v-model="studentStore.request.firstname"/>
                </FormField>
                <FormField label="Middlename">
                    <FormControl v-model="studentStore.request.middlename"/>
                </FormField>
                <FormField label="Lastname">
                    <FormControl v-model="studentStore.request.lastname"/>
                </FormField>
                <FormField label="Suffix">
                    <FormControl v-model="studentStore.request.suffix"/>
                </FormField>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Gender">
                    <FormControl v-model="studentStore.request.gender" :options="gender"/>
                </FormField>
                <FormField label="Birthdate">
                    <FormControl v-model="studentStore.request.birtdate" type="date"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Phone Number">
                    <FormControl v-model="studentStore.request.telephone_number"/>
                </FormField>
                <FormField label="Address">
                    <FormControl v-model="studentStore.request.address"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Email">
                    <FormControl v-model="studentStore.request.email"/>
                </FormField>
                <FormField label="Password">
                    <FormControl v-model="studentStore.request.password" type="password"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Student Type">
                    <FormControl v-model="studentStore.request.grouptype" :options="groupTypes"/>
                </FormField>
                <FormField label="Course">
                    <FormControl v-model="studentStore.request.course_id" :options="courses_list"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Status">
                    <FormControl v-model="studentStore.request.status_id" :options="status"/>
                </FormField>
            </div>

        </div>

        <BaseDivider />
        <BaseButtons>
            <BaseButton
                label="Update"
                color="info"
                @click="userUpdate()"
            />
        </BaseButtons>

    </CardBox>
</template>