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

import { useSubmissionOneStore } from '@/stores/admin/submissionone.js';
import { status } from '@/settings_data';

const submissionOne = useSubmissionOneStore()

// Emits
const emit = defineEmits(['back', 'comment'])


// Props
const props = defineProps({
  submissionDetails: {
    type: Object,
    default: null
  },
})

// Computed functions
const submissionStatus = computed(() => {
    return status.filter(e => e.id <= 3)
})

// Variables
const loading = inject('Loader')

// Declared Functions
const back = () => {
    emit('back', false);
}

const submit = () => {
    loading.show()
    submissionOne.comment(props.submissionDetails.id).then(res => {
        loading.hide()
        emit('comment', { status: true, list: res.data.comments });
    }).catch(() => {
        loading.hide()
        emit('comment', { status: false});
    })
}

</script>
<template>
    <CardBox
      title="Submission Details"
      :form="true"
      :headerIcon="mdiArrowLeftBold" 
      @header-icon-click="back()"
    >
        <div class="grid grid-cols-1 lg:grid-cols-6 py-2">

            <div class="content lg:col-start-2 lg:col-span-4">

                <div class="grid grid-cols-1 lg:grid-cols-2 pb-2">
                    <div class="col-span-2">
                        <a class="text-xl text-blue-500 hover:underline" :href="submissionDetails.file_url">{{ submissionDetails.file }}</a>
                    </div>

                    <div class="submit-details text-start">
                        <h3 class="text-lg py-1">Datetime Submitted: <span class="font-bold">{{ submissionDetails.sendby_datetime }}</span></h3>
                        <h3 class="text-lg py-1">Submitted By: <span class="font-bold">{{ submissionDetails.submitted_by }}</span></h3>
                        <h3 class="text-lg py-1">Submitted To: <span class="font-bold">{{ submissionDetails.submitted_to }}</span></h3>
                    </div>

                    <div class="checked-details text-end">
                        <h3 class="text-lg py-1">Datetime Checked : <span class="font-bold">{{ submissionDetails.approved_datetime }}</span></h3>
                        <h3 class="text-lg py-1">Checked By : <span class="font-bold">{{ submissionDetails.checked_by }}</span></h3>
                        <h3 class="text-lg py-1">Status :  <span class="font-bold">{{ submissionDetails.status }}</span></h3>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-col-3">
                    
                </div>

            </div>

            <div class="content lg:col-start-2 lg:col-span-4">
                
                <BaseDivider />

                <div class="h-80 overflow-y-auto">

                     <article v-for="comment in submissionDetails.comments" :key="comment.id" class="p-6 mb-2 text-base bg-white rounded-lg dark:bg-gray-900" :class="comment.id != 1 ? 'border-t' : ''">
                    
                        <footer class="flex justify-between items-center mb-2">

                            <div class="flex items-center">

                                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <img
                                        class="mr-2 w-6 h-6 rounded-full"
                                        :src="comment.user_details.file_url ?? 'https://flowbite.com/docs/images/people/profile-picture-2.jpg' "
                                        alt="Michael Gough"
                                    >
                                    {{ comment.user_details.fullname }}
                                </p>

                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ comment.created_at }}</p>

                            </div>

                        </footer>

                        <p class="text-gray-500 dark:text-gray-400">{{ comment.comment }}</p>

                        <div v-if="comment.file_url != null" class="flex items-center mt-4 space-x-4">
                            
                            <a :href="comment.file_url" type="button"
                                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="mr-1 w-4 h-4" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 488.658 488.658" style="enable-background:new 0 0 488.658 488.658;" xml:space="preserve">
                                    <g>
                                        <g>
                                            <path d="M225.485,317.756c-21-23-42.8-45.1-67.4-64.3c-7.4-5.8-16.2-8-22.1-1.1c-5.4,6.3-5,15.3,1.1,22.8    c11,13.4,21.9,27,34.3,39.1c19.9,19.4,41,37.6,61.6,56.4c0.6,1,1.2,1.9,1.8,2.9v0.1c3.1,4.8,9.6,6.2,14.4,3.1l4.8-3.1    c41.9-27.1,72.7-66.8,109.2-100c1.7-1.5,1.7-6.5,0.7-9c-1.9-5-6.8-5.9-12.1-5.1c-17.2,2.7-32.5,11.6-45.7,23    c-15.8,13.7-31.7,27.2-47.2,41.3c1.2-14.4,2.1-28.8,2-43.2c-0.4-32.2-2.4-64.4-3.7-96.6c11.5-57.7,4.9-116.8,7.3-175.2    c0.1-2.6-3.4-6.7-5.8-8c-4.9-2.5-9,0.8-12.1,5.7c-10.3,16.3-14.8,36.1-16,56.2c-2.9,48.5-7.3,97-4,145.7c-0.4,6-0.8,12.1-1.1,18.1    C224.085,256.956,223.585,287.456,225.485,317.756z"/>
                                            <path d="M214.685,450.756c-6.3-0.4-12.6-0.8-18.9-1.1c-40-1.7-80-2.2-119.8,1.9c-11.3,1.2-20.7,5.8-19.9,14.8    c0.8,8.3,8.8,14.4,20.4,15.3c20.9,1.7,41.9,3.6,62.8,3.4c33.7-0.4,67.3-2.4,101-3.7c60.3,11.5,122.1,4.9,183.1,7.3    c2.7,0.1,7-3.4,8.3-5.8c2.7-4.9-0.8-9-6-12.1c-17-10.3-37.7-14.8-58.8-16C316.385,451.956,265.685,447.556,214.685,450.756z"/>
                                        </g>
                                    </g>
                                </svg>
                                Download File Attached
                            </a>

                        </div>

                    </article>

                </div>

                <div class="mt-2">

                    <div class="py-2">
                        <FormField label="Attached File" class="pb-2">
                            <FormFilePicker v-model="submissionOne.request.file"/>
                        </FormField>

                        <FormField label="Status" class="pb-2">
                            <FormControl v-model="submissionOne.request.status" :options="submissionStatus" />
                        </FormField>

                        <FormField label="Add Comments">
                            <FormControl type="textarea" v-model="submissionOne.request.comment" />
                        </FormField>
                    </div>

                    <BaseButtons>
                        <BaseButton
                            label="Post Comment"
                            color="info"
                            @click="submit()"
                        />
                    </BaseButtons>
                    
                </div>
            </div>
            
        </div>

        

    </CardBox>
</template>