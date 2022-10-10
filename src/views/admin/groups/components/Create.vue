<script setup>
import { ref, computed, watch, inject } from 'vue'

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

import { useGroupStore } from '@/stores/admin/groups.js';
import { status, groupTypes } from '@/settings_data.js';

const groupStore = useGroupStore()

// Emits
const emit = defineEmits(['back', 'groupCreate'])

// Variables
const isShowModal = ref(false);
const accountType = ref('');
const titleModal = ref('');
const fullname = ref('');
const isShowDeleteModal = ref(false);
const accountIndex = ref(null);

const loading = inject('Loader')

// Props
const props = defineProps({
  courses: {
    type: Array,
    default: []
  },
  milestoneOne: {
    type: Array,
    default: []
  },
  milestoneTwo: {
    type: Array,
    default: []
  }
})

// Computed
const courses = computed(() => {
    const data = [];
    props.courses.forEach(element => {
        data.push({
            id: element.id,
            label: element.course.toUpperCase()
        }) 
    });

    return data;
})
const milestoneOne = computed(() => {
    const data = [];
    props.milestoneOne.forEach(element => {
        data.push({
            id: element.id,
            label: element.milestone.toUpperCase()
        }) 
    });

    return data;
})
const milestoneTwo = computed(() => {
    const data = [];
    props.milestoneTwo.forEach(element => {
        data.push({
            id: element.id,
            label: element.milestone.toUpperCase()
        }) 
    });

    return data;
})
const groupStatus = computed(() => {
    return status.filter(e => e.id >= 9)
})

// Declared Functions
const back = () => {
    emit('back', false);
}

const groupCreate = () => {
    loading.show()
    groupStore.create().then(res => {
        loading.hide()
        emit('groupCreate', { status: true, list: res.data.researches });
    }).catch(() => {
        loading.hide()
        emit('groupCreate', { status: false});
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
        groupStore.request.member.push({
            id: null,
            fullname: fullname.value
        })
    }
    else if (accountType.value == 'adviser') {
        groupStore.request.adviser.push({
            id: null,
            fullname: fullname.value
        })
    }
    else {
        groupStore.request.panel.push({
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
        groupStore.request.member.splice(accountIndex, 1)
    }
    else if (accountType.value == 'adviser') {
        groupStore.request.adviser.splice(accountIndex, 1)
    }
    else {
        groupStore.request.panel.splice(accountIndex, 1)
    }
}

// Notification Hide Function
const hideNotification = () => {
  groupStore.status.status = true
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
      v-if="!groupStore.status.status"
      :isDismissed="groupStore.status.status"
      :color="groupStore.status.success ? 'success' : 'danger'"
      :icon="mdiTableBorder"
      @hide-notification="hideNotification"
    >
      {{ groupStore.status.message }}
    </NotificationBar> -->

    <CardBox
      title="Create New Group"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3">
            <FormField label="Research Title">
                <FormControl v-model="groupStore.request.title"/>
            </FormField>

            <FormField label="Groupname">
                <FormControl
                    v-model="groupStore.request.groupname"
                />
            </FormField>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Course">
                    <FormControl
                        v-model="groupStore.request.course"
                        :options="courses"
                    />
                </FormField>
                <FormField label="Type">
                    <FormControl
                        v-model="groupStore.request.type"
                        :options="groupTypes"
                    />
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Milestone">
                    <FormControl
                        v-model="groupStore.request.milestone"
                        :options="groupStore.request.type == 1 || groupStore.request.type == '' ? milestoneOne : milestoneTwo"
                    />
                </FormField>
                <FormField label="Progress" help="Overall Percent Progress. 0% to 100%">
                    <FormControl
                        v-model="groupStore.request.progress"
                    />
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Status">
                    <FormControl
                        v-model="groupStore.request.status"
                        :options="groupStatus"
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
                                <li v-for="(member, index) in groupStore.request.member" :key="member.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
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
                                <li v-for="(adviser, index) in groupStore.request.adviser" :key="adviser.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
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
                                <li v-for="(panel, index) in groupStore.request.panel" :key="panel.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
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
                @click="groupCreate()"
            />
        </BaseButtons>

    </CardBox>
</template>