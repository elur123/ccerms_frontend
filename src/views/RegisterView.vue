<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk, mdiTableBorder } from '@mdi/js'


import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import { customAlert } from '@/alert.js'

import { useAuthStore } from '@/stores/auth.js';
import { useLayoutStore } from '@/stores/layout.js'
import { useCourseStore } from '@/stores/admin/course.js'

import { url } from '@/config'
import { userTypes } from '@/settings_data'

const layoutStore = useLayoutStore()
const authStore = useAuthStore()
const courseStore = useCourseStore()

const router = useRouter()
const userType = ref('student');

onMounted(() => {
  courseStore.fetch()
})

const personnelType = computed(() => {

  return userTypes.filter(e => e.id >= 3 && e.id <= 5)
})

const courses = computed(() => {

  return courseStore.list.map(function(c) {

    return {
      id: c.id,
      label: c.course
    }
  })
})

const changeType = (type) => {
  authStore.request.usertype = ''
  userType.value = type

  if (type == 'student') {
    
    authStore.request.allow_adviser = false
    authStore.request.allow_panel = false
    authStore.request.allow_st = false
    authStore.request.usertype = 6
  }
}

const changePersonnelType = () => {

  if (authStore.request.usertype == 3) {
    
    authStore.request.allow_adviser = true
    authStore.request.allow_panel = false
    authStore.request.allow_st = false
  }

  if (authStore.request.usertype == 4) {
    
    authStore.request.allow_adviser = false
    authStore.request.allow_panel = true
    authStore.request.allow_st = false
  }

  if (authStore.request.usertype == 5) {
    
    authStore.request.allow_adviser = false
    authStore.request.allow_panel = false
    authStore.request.allow_st = true
  }
}

const submit = () => {

  layoutStore.showLoading = true
  authStore.register().then(res => {

    layoutStore.showLoading = false
    customAlert('success', 'Successfully regirestered!')
    router.push('/register-success')
  }).catch(err => {

    layoutStore.showLoading = false
    customAlert('warning', 'Check required field!')
  })
  
}
</script>

<template>
  
  <div class="w-screen h-screen flex justify-center items-center bg-yellow-200">
    <CardBox
      class="w-11/12 md:w-6/12"
      form
      @submit.prevent="submit"
    >

      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li class="mr-2">
              <a class="cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 hover:text-yellow-600 dark:hover:bg-gray-800 dark:hover:text-gray-300" 
              :class="userType == 'student' ? 'active bg-gray-100 text-yellow-600 dark:bg-gray-800 dark:text-blue-500' : ''"
              @click="changeType('student')"
              >
                Student
              </a>
          </li>
          <li class="mr-2">
              <a class="cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 hover:text-yellow-600 dark:hover:bg-gray-800 dark:hover:text-gray-300" 
              :class="userType == 'personnel' ? 'active bg-gray-100 text-yellow-600 dark:bg-gray-800 dark:text-blue-500' : ''"
              @click="changeType('personnel')"
              >
                Personnel
              </a>
          </li>
      </ul>

      <div class="grid grid-cols-1 gap-3 md:grid-cols-4 mt-3">

          <FormField
            label="Firstname"
          >
            <FormControl
              v-model="authStore.request.firstname"
            />
          </FormField>

          <FormField
            label="Middlename"
          >
            <FormControl
              v-model="authStore.request.middlename"
            />
          </FormField>

          <FormField
            label="Lastname"
          >
            <FormControl
              v-model="authStore.request.lastname"
            />
          </FormField>

          <FormField
            label="Suffix"
          >
            <FormControl
              v-model="authStore.request.suffix"
            />
          </FormField>

      </div>

      <div class="grid grid-cols-1 gap-3 mt-3" :class="userType == 'student' ? 'md:grid-cols-2' : 'md:grid-cols-3'">
        
        <FormField
            v-if="userType == 'student'"
            label="Course"
          >
          <FormControl
            v-model="authStore.request.course"
            :options="courses"
          />
        </FormField>

        <FormField
            label="Email"
          >
          <FormControl
            v-model="authStore.request.email"
            type="email"
          />
        </FormField>

        <FormField
            label="Password"
          >
          <FormControl
            v-model="authStore.request.password"
            type="password"
          />
        </FormField>

        <FormField
            label="Confirm Password"
          >
          <FormControl
            v-model="authStore.request.password_confirmation"
            type="password"
          />
        </FormField>

      </div>

      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 mt-3" v-if="userType == 'personnel'">

         <FormField
            label="User Type"
          >
          <FormControl
            v-model="authStore.request.usertype"
            :options="personnelType"
            @change="changePersonnelType"
          />
        </FormField>

        <FormField
            label="Account Access"
          >
          
          <div class="flex mt-5">
              <div class="form-check form-check-inline pr-2">
                  <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                      type="checkbox" id="allow-adviser" value="1" v-model="authStore.request.allow_adviser"
                  >
                  <label class="form-check-label inline-block text-gray-800 cursor-pointer" for="allow-adviser">Adviser</label>
              </div>
              <div class="form-check form-check-inline pr-2">
                  <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                      type="checkbox" id="allow-panel" value="1" v-model="authStore.request.allow_panel"
                  >
                  <label class="form-check-label inline-block text-gray-800 cursor-pointer" for="allow-panel">Panel</label>
              </div>
              <div class="form-check form-check-inline pr-2">
                  <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                      type="checkbox" id="allow-st" value="1" v-model="authStore.request.allow_st"
                  >
                  <label class="form-check-label inline-block text-gray-800 cursor-pointer" for="allow-st">Subject Teacher</label>
              </div>
          </div>
        </FormField>
      </div>


      <BaseDivider />

      <BaseButtons>
        <BaseButton
          type="submit"
          color="warning"
          label="Register"
        />
      </BaseButtons>
    </CardBox>
  </div>
</template>
