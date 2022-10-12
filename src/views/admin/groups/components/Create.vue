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
import { useStudentStore } from '@/stores/admin/students.js';
import { useUserStore } from '@/stores/admin/users.js';
import { status, groupTypes } from '@/settings_data.js';

const groupStore = useGroupStore()
const studentStore = useStudentStore()
const userStore = useUserStore()

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

const localCreate = (index, type) => {
    switch (type) {
        case 'member':
            studentStore.available[index].available = false
            const details = studentStore.available[index]
            groupStore.request.member.push(details)
            break;
        case 'adviser':
            const adviser_details = userStore.adviser_available[index]
            groupStore.request.adviser.push(adviser_details)
            userStore.adviser_available[index].available = false

            const panel_index = userStore.panel_available.indexOf(userStore.panel_available.find(e => e.id == adviser_details.id));
            if(panel_index >= 0) userStore.panel_available[panel_index].available = false
            break;
        default:
            const panel_details = userStore.panel_available[index]
            groupStore.request.panel.push(panel_details)
            userStore.panel_available[index].available = false

            const adviser_index = userStore.adviser_available.indexOf(userStore.adviser_available.find(e => e.id == panel_details.id));
            if (adviser_index >= 0)  userStore.adviser_available[adviser_index].available = false
            break;
    }
}

const showModalDelete = (index, type) => {
    accountIndex.value = index
    accountType.value = type
    isShowDeleteModal.value = true
}

const localDelete = () => {
    switch (accountType.value) {
        case 'member':
            const member_id = groupStore.request.member[accountIndex.value].id
            const index = studentStore.available.indexOf(studentStore.available.find(e => e.id == member_id))
            studentStore.available[index].available = true
            groupStore.request.member.splice(accountIndex.value, 1)
            break;
        case 'adviser':
            // Get All id and index;
            const adviser_id = groupStore.request.adviser[accountIndex.value].id
            const adviser_index = userStore.adviser_available.indexOf(userStore.adviser_available.find(e => e.id == adviser_id))
            const panel_index = userStore.panel_available.indexOf(userStore.panel_available.find(e => e.id == adviser_id))
            
            // Update Availability
            if(adviser_index >= 0) userStore.adviser_available[adviser_index].available = true
            if(panel_index >= 0) userStore.panel_available[panel_index].available = true
            
            // Remove from list
            groupStore.request.adviser.splice(accountIndex.value, 1)
            break;
        default:
            // Get All id and index;
            const panel_id = groupStore.request.panel[accountIndex.value].id
            const _adviser_index = userStore.adviser_available.indexOf(userStore.adviser_available.find(e => e.id == panel_id))
            const _panel_index = userStore.panel_available.indexOf(userStore.panel_available.find(e => e.id == panel_id))
            
            // Update Availability
            if(_adviser_index >= 0) userStore.adviser_available[_adviser_index].available = true
            if(_panel_index >= 0) userStore.panel_available[_panel_index].available = true

            // Remove from list
            groupStore.request.panel.splice(accountIndex.value, 1)
            break;
    }
    if (accountType.value == 'member') {
        
    }
    else if (accountType.value == 'adviser') {
        
    }
    else {
        
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
        buttonLabel="Close"
    >

    <div class="flex justify-center">
        <ul v-if="accountType == 'member'" class=" bg-white rounded-lg w-96 text-gray-900">
            <li v-for="(studentsList, index) in studentStore.available" :key="studentsList.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                <p>{{ studentsList.fullname }}</p>
                <BaseIcon
                    v-if="studentsList.available"
                    :path="mdiPlus"
                    class="cursor-pointer mr-3"
                    @click="localCreate(index, 'member')"
                />
                <div class="p-1 bg-lime-300 text-white text-sm rounded font-semibold " v-else>Added</div>
            </li>
        </ul>

        <ul v-else-if="accountType == 'adviser'" class=" bg-white rounded-lg w-96 text-gray-900">
            <li v-for="(adviserList, index) in userStore.adviser_available" :key="adviserList.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                <p>{{ adviserList.fullname }}</p>
                <BaseIcon
                    v-if="adviserList.available"
                    :path="mdiPlus"
                    class="cursor-pointer mr-3"
                    @click="localCreate(index, 'adviser')"
                />
                <div class="p-1 bg-lime-300 text-white text-sm rounded font-semibold " v-else>Added</div>
            </li>
        </ul>

        <ul v-else class=" bg-white rounded-lg w-96 text-gray-900">
            <li v-for="(panelList, index) in userStore.panel_available" :key="panelList.id" class="px-6 py-2 border-b border-gray-200 w-full flex justify-between">
                <p>{{panelList.fullname }}</p>
                <BaseIcon
                    v-if="panelList.available"
                    :path="mdiPlus"
                    class="cursor-pointer mr-3"
                    @click="localCreate(index, 'panel')"
                />
                <div class="p-1 bg-lime-300 text-white text-sm rounded font-semibold " v-else>Added</div>
            </li>
        </ul>
    </div>

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