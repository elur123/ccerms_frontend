<script setup>
  import {
    ref,
    reactive
  } from 'vue'
  import {
    mdiBallot,
    mdiPlus,
    mdiTableBorder
  } from '@mdi/js'

  import SectionMain from '@/components/SectionMain.vue'
  import SectionTitleBar from '@/components/SectionTitleBar.vue'

  import {
    useStudentDetailsStore
  } from '@/stores/student/details.js';
  import {
    useAuthStore
  } from '@/stores/auth.js'

  const titleStack = ref(['Student', 'General', 'Group'])

  const studentDetails = useStudentDetailsStore()
  const authStore = useAuthStore()

  studentDetails.fetch(authStore.user.id)

</script>

<template>

  <SectionTitleBar :title-stack="titleStack" />

  <SectionMain>
    <div class="container px-3 md:px-0">

      <div v-if="studentDetails.details" class="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div class="group-milestone md:col-span-4 py-5">
          <h3 class="text-2xl font-semibold border-b-4 border-yellow-500 py-2">GROUP MILESTONE</h3>

          <div class="p-5">

            <ol v-if="studentDetails.details.grouptype.id == 1" class="items-center sm:flex">
              <li v-for="milestone in studentDetails.onemilestone" :key="milestone.id" class="relative mb-6 sm:mb-0">
                <div class="flex items-center">
                  <div
                    class="flex z-10 justify-center items-center w-6 h-6 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0" :class="milestone.id == studentDetails.details.group.onemilestone_id ? 'bg-yellow-200' : 'bg-gray-200'">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="31.424px" height="31.425px"
                      viewBox="0 0 31.424 31.425" style="enable-background:new 0 0 31.424 31.425;" xml:space="preserve">
                      <g>
                        <path d="M15.712,3.132c6.937,0,12.581,5.644,12.581,12.58c0,6.938-5.645,12.581-12.581,12.581c-6.937,0-12.58-5.645-12.58-12.581
                        C3.132,8.775,8.775,3.132,15.712,3.132 M15.712,0C7.035,0,0,7.034,0,15.712c0,8.679,7.035,15.713,15.712,15.713
                        c8.677,0,15.712-7.034,15.712-15.713C31.425,7.034,24.389,0,15.712,0L15.712,0z" />
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                    </svg>
                  </div>
                  <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3 sm:pr-8">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white uppercase  ">{{ milestone.milestone }}
                  </h3>
                  <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Done on
                    December 2, 2021</time>
                </div>
              </li>

            </ol>

          </div>

        </div>

        <div class="group-details py-5">
          <h3 class="text-2xl font-semibold border-b-4 border-yellow-500 py-2">GROUP DETAILS</h3>
          <div class="px-2">
            <h5 class="py-2">Title: <span class="font-semibold">{{ studentDetails.details.group.title }}</span></h5>
            <h5 class="py-2">Group name: <span class="font-semibold">{{ studentDetails.details.group.groupname }}</span></h5>
            <h5 class="py-2">Group Type: <span class="font-semibold">{{ studentDetails.details.grouptype.type }}</span></h5>
          </div>
        </div>

        <div class="group-details py-5">
          <h3 class="text-2xl font-semibold border-b-4 border-yellow-500 py-2">GROUP MEMBERS</h3>
          <div class="px-2">
            <h5 v-for="(member, index) in studentDetails.details.group.members" :key="index" class="font-semibold py-2">
              {{ `${member.firstname} ${member.middlename} ${member.lastname}` }}</h5>
          </div>
        </div>

        <div class="group-details py-5">
          <h3 class="text-2xl font-semibold border-b-4 border-yellow-500 py-2">GROUP ADVISER</h3>
          <div class="px-2">
            <h5 v-for="(adviser, index) in studentDetails.details.group.advisers" :key="index" class="font-semibold py-2">
              {{ `${adviser.firstname} ${adviser.middlename} ${adviser.lastname}` }}</h5>
          </div>
        </div>

        <div class="group-details py-5">
          <h3 class="text-2xl font-semibold border-b-4 border-yellow-500 py-2">GROUP PANELS</h3>
          <div class="px-2">
            <h5 v-for="(panel, index) in studentDetails.details.group.panels" :key="index" class="font-semibold py-2">
              {{ `${panel.firstname} ${panel.middlename} ${panel.lastname}` }}</h5>
          </div>
        </div>

      </div>

    </div>
  </SectionMain>

</template>
