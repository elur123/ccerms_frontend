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

import { useUserStore } from '@/stores/admin/users.js';
import { userTypes, gender, status } from '@/settings_data.js';

const userStore = useUserStore()

// Emits
const emit = defineEmits(['back', 'userUpdate'])

// Variables
const isShowModal = ref(false);
const accountType = ref('');
const titleModal = ref('');
const fullname = ref('');
const isShowDeleteModal = ref(false);
const accountIndex = ref(null)
const isNext = ref(false);

const loading = inject('Loader')

// Props
const props = defineProps({
  course: {
    type: Array,
    default: []
  },
  item: {
    type: Object,
    default: null
  }
})

// Computed Functions
const statusList = computed(() => {
    return status.filter(e => e.id <= 3)
})


// Declared Functions
userStore.fetchAccessList();

const back = () => {
    emit('back', false);
}

const nextPage = () => {
    isNext.value = true;
}

const watchAccess = (e) => {
    const val = e.target._value;
    if (e.target.checked) {
        userStore.request.access.push(val)
    }

    else {
        let index = userStore.request.access.indexOf(val)
        userStore.request.access.splice(index, 1)
    }
}

const checkedAcess = (id) => {
    let isChecked = false;
    let find = userStore.request.access.find(e => e == id)

    if ( find != undefined ) isChecked = true

    return isChecked;
}

const userUpdate = () => {
    loading.show()
    userStore.update().then(res => {
        loading.hide()
        emit('userUpdate', { status: true, list: res.data.users });
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
        userStore.request.member.push({
            id: null,
            fullname: fullname.value
        })
    }
    else if (accountType.value == 'adviser') {
        userStore.request.adviser.push({
            id: null,
            fullname: fullname.value
        })
    }
    else {
        userStore.request.panel.push({
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
        userStore.request.member.splice(accountIndex, 1)
    }
    else if (accountType.value == 'adviser') {
        userStore.request.adviser.splice(accountIndex, 1)
    }
    else {
        userStore.request.panel.splice(accountIndex, 1)
    }
}

// Notification Hide Function
const hideNotification = () => {
  userStore.status.status = true
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
      title="Update User"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="space-y-3" v-if="!isNext">
            <NotificationBarInCard color="light">
                <span class="font-bold">User Details.</span>
            </NotificationBarInCard>

            <div class="grid grid-cols-1 md:grid-cols-2">
                <FormField label="Profile Picture">
                    <FormFilePicker v-model="userStore.request.file"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField label="Firstname">
                    <FormControl v-model="userStore.request.firstname"/>
                </FormField>
                <FormField label="Middlename">
                    <FormControl v-model="userStore.request.middlename"/>
                </FormField>
                <FormField label="Lastname">
                    <FormControl v-model="userStore.request.lastname"/>
                </FormField>
                <FormField label="Suffix">
                    <FormControl v-model="userStore.request.suffix"/>
                </FormField>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Gender">
                    <FormControl v-model="userStore.request.gender" :options="gender"/>
                </FormField>
                <FormField label="Birthdate">
                    <FormControl v-model="userStore.request.birtdate" type="date"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Phone Number">
                    <FormControl v-model="userStore.request.telephone_number"/>
                </FormField>
                <FormField label="Address">
                    <FormControl v-model="userStore.request.address"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Email">
                    <FormControl v-model="userStore.request.email"/>
                </FormField>
                <FormField label="Password">
                    <FormControl v-model="userStore.request.password" type="password"/>
                </FormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="User Type">
                    <FormControl v-model="userStore.request.usertype_id" :options="userTypes"/>
                </FormField>
                <FormField label="Other Type" v-if="userStore.request.usertype_id == 7">
                    <FormControl v-model="userStore.request.other_type" />
                </FormField>
                <FormField label="Status">
                    <FormControl v-model="userStore.request.status_id" :options="statusList"/>
                </FormField>
            </div>

            <BaseDivider />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Allow">
                    <div class="flex">
                        <div class="form-check form-check-inline pr-2">
                            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                                type="checkbox" id="allow-adviser" value="1" v-model="userStore.request.allow_adviser"
                            >
                            <label class="form-check-label inline-block text-gray-800 cursor-pointer" for="allow-adviser">Adviser</label>
                        </div>
                        <div class="form-check form-check-inline pr-2">
                            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                                type="checkbox" id="allow-panel" value="1" v-model="userStore.request.allow_panel"
                            >
                            <label class="form-check-label inline-block text-gray-800 cursor-pointer" for="allow-panel">Panel</label>
                        </div>
                        <div class="form-check form-check-inline pr-2">
                            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                                type="checkbox" id="allow-st" value="1" v-model="userStore.request.allow_st"
                            >
                            <label class="form-check-label inline-block text-gray-800 cursor-pointer" for="allow-st">Subject Teacher</label>
                        </div>
                    </div>
                </FormField>
            </div>

        </div>

        <div class="space-y-3" v-else>
            <NotificationBarInCard color="light">
                <span class="font-bold">Select user access.</span>
            </NotificationBarInCard>

            <div class="access-item" v-for="(access, index) in userStore.access_list" :key="index">
                <h4 class="font-bold pb-2">{{ access.label }}</h4>
                <div class="flex">
                    <div class="form-check form-check-inline px-3" v-for="(access_item, sub_index) in access.data" :key="sub_index">
                        <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                            type="checkbox" :id="access_item.id" :value="access_item.id" :checked="checkedAcess(access_item.id)"
                            @change="watchAccess($event)"
                        >
                        <label class="form-check-label inline-block text-gray-800 cursor-pointer" :for="access_item.id">{{ access_item.access.toUpperCase() }}</label>
                    </div>
                </div>
                <BaseDivider v-if="index != userStore.access_list.length - 1" />
            </div>
        </div>

        <BaseDivider />
        <BaseButtons>
            <BaseButton
                v-if="!isNext"
                label="Next"
                color="info"
                @click="nextPage()"
            />
            <BaseButton
                v-if="isNext"
                label="Previous"
                color="info"
                @click="isNext = false"
            />
            <BaseButton
                v-if="isNext"
                label="Update"
                color="info"
                @click="userUpdate()"
            />
        </BaseButtons>

    </CardBox>
</template>