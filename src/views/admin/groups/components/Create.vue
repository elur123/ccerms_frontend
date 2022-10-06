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

import { useResearcharchiveStore } from '@/stores/admin/researcharchives.js';

const researchStore = useResearcharchiveStore()

// Emits
const emit = defineEmits(['back', 'archivesCreate'])

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
  course: {
    type: Array,
    default: []
  }
})

// Computed
const courses = computed(() => {
    const data = [];
    props.course.forEach(element => {
        data.push({
            id: element.id,
            label: element.course.toUpperCase()
        }) 
    });

    return data;
})

// Declared Functions
const back = () => {
    emit('back', false);
}

const archivesCreate = () => {
    loading.show()
    researchStore.create().then(res => {
        loading.hide()
        emit('archivesCreate', { status: true, list: res.data.researches });
    }).catch(() => {
        loading.hide()
        emit('archivesCreate', { status: false});
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
        researchStore.request.member.push({
            id: null,
            fullname: fullname.value
        })
    }
    else if (accountType.value == 'adviser') {
        researchStore.request.adviser.push({
            id: null,
            fullname: fullname.value
        })
    }
    else {
        researchStore.request.panel.push({
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
        researchStore.request.member.splice(accountIndex, 1)
    }
    else if (accountType.value == 'adviser') {
        researchStore.request.adviser.splice(accountIndex, 1)
    }
    else {
        researchStore.request.panel.splice(accountIndex, 1)
    }
}

// Notification Hide Function
const hideNotification = () => {
  researchStore.status.status = true
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

    <NotificationBar
      v-if="!researchStore.status.status"
      :isDismissed="researchStore.status.status"
      :color="researchStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ researchStore.status.message }}
    </NotificationBar>

    <CardBox
      title="Create New Group"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3">
            <FormField label="Research Title">
                <FormControl v-model="researchStore.request.title"/>
            </FormField>

            <FormField label="Groupname">
                <FormControl
                    v-model="researchStore.request.course"
                />
            </FormField>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Course">
                    <FormControl
                        v-model="researchStore.request.course"
                    />
                </FormField>
                <FormField label="Type">
                    <FormControl
                        v-model="researchStore.request.course"
                    />
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Milestone">
                    <FormControl
                        v-model="researchStore.request.course"
                    />
                </FormField>
                <FormField label="Progress">
                    <FormControl
                        v-model="researchStore.request.course"
                    />
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Status">
                    <FormControl
                        v-model="researchStore.request.course"
                    />
                </FormField>
            </div>

             <BaseDivider />

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <CardBox 
                        title="Members"
                        :headerIcon="mdiPlus"
                        @header-icon-click="showModal('member')"
                    >
                        <div class="flex justify-center">
                            <ul class="bg-white rounded-lg w-96 text-gray-900">
                                <li v-for="(member, index) in researchStore.request.member" :key="member.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                                    <p>{{ member.fullname }}</p>
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
                        title="Adviser(s)"
                        :headerIcon="mdiPlus"
                        @header-icon-click="showModal('adviser')"
                    >
                        <div class="flex justify-center">
                            <ul class="bg-white rounded-lg w-96 text-gray-900">
                                <li v-for="(adviser, index) in researchStore.request.adviser" :key="adviser.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
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
                <div>
                    <CardBox 
                        title="Panel(s)"
                        :headerIcon="mdiPlus"
                        @header-icon-click="showModal('panel')"
                    >
                        <div class="flex justify-center">
                            <ul class="bg-white rounded-lg w-96 text-gray-900">
                                <li v-for="(panel, index) in researchStore.request.panel" :key="panel.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                                    <p>{{ panel.fullname }}</p>
                                    <BaseIcon
                                        :path="mdiTrashCan"
                                        class="cursor-pointer mr-3"
                                        @click="showModalDelete(index, 'panel')"
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
                @click="archivesCreate()"
            />
        </BaseButtons>

    </CardBox>
</template>