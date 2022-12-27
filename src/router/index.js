import { createRouter, createWebHashHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import AdminIndex from '@/views/admin/Index.vue'
import StudentIndex from '@/views/student/Index.vue'

import { authenticate, adminAuthenticated, studentAuthenticated } from '@/auth.js'

const routes = [
  {
    meta: {
      fullScreen: true
    },
    path: '/',
    name: 'landingpage',
    component: LandingPage
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue')
  },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  },
  {
    beforeEnter: authenticate,
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Account Hold',
      fullScreen: true
    },
    path: '/hold',
    name: 'hold',
    component: () => import('@/views/HoldView.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Dashboard'
    },
    path: '/admin/dashboard',
    name: 'dashboard',
    component: AdminIndex
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Students'
    },
    path: '/admin/students',
    name: 'admin-students',
    component: () => import('@/views/admin/students/Students.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Groups'
    },
    path: '/admin/groups',
    name: 'admin-groups',
    component: () => import('@/views/admin/groups/Groups.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Sections'
    },
    path: '/admin/sections',
    name: 'admin-sections',
    component: () => import('@/views/admin/sections/Sections.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Defense Schedule'
    },
    path: '/admin/defenseschedules',
    name: 'admin-defenseschedules',
    component: () => import('@/views/admin/schedules/Schedules.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Submissions'
    },
    path: '/admin/submissions-one',
    name: 'admin-submissions-one',
    component: () => import('@/views/admin/submissionone/SubmissionOne.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Submissions'
    },
    path: '/admin/submissions-two',
    name: 'admin-submissions-two',
    component: () => import('@/views/admin/submissionone/SubmissionOne.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Users'
    },
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('@/views/admin/users/UserSettings.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Milestone One'
    },
    path: '/admin/milestone/one',
    name: 'admin-milestoneone',
    component: () => import('@/views/admin/milestoneonesetup/MilestoneOne.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Milestone Two'
    },
    path: '/admin/milestone/two',
    name: 'admin-milestonetwo',
    component: () => import('@/views/admin/milestonetwosetup/MilestoneTwo.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Research Archives'
    },
    path: '/admin/researcharchives',
    name: 'admin-researcharchives',
    component: () => import('@/views/admin/researcharchives/ResearchArchives.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Courses'
    },
    path: '/admin/courses',
    name: 'admin-courses',
    component: () => import('@/views/admin/course/CourseSettings.vue')
  },
  {
    beforeEnter: adminAuthenticated,
    meta: {
      title: 'Schedule Types'
    },
    path: '/admin/scheduletypes',
    name: 'admin-scheduletypes',
    component: () => import('@/views/admin/scheduletype/ScheduleTypeSettings.vue')
  },

  // Student Route
  {
    beforeEnter: studentAuthenticated,
    meta: {
      title: 'Dashboard'
    },
    path: '/student/dashboard',
    name: 'student-dashboard',
    component: StudentIndex
  },
  {
    beforeEnter: studentAuthenticated,
    meta: {
      title: 'Group'
    },
    path: '/student/group',
    name: 'student-group',
    component: () => import('@/views/student/Group/Index.vue')
  },
  {
    beforeEnter: studentAuthenticated,
    meta: {
      title: 'Section'
    },
    path: '/student/section',
    name: 'student-section',
    component: () => import('@/views/student/Section/Index.vue')
  },
  {
    beforeEnter: studentAuthenticated,
    meta: {
      title: 'Section'
    },
    path: '/student/research-archives',
    name: 'student-research-archives',
    component: () => import('@/views/student/ResearchArchives/Index.vue')
  },
  {
    beforeEnter: studentAuthenticated,
    meta: {
      title: 'Schedules'
    },
    path: '/student/schedules',
    name: 'student-schedules',
    component: () => import('@/views/student/Schedules/Index.vue')
  },
  {
    beforeEnter: studentAuthenticated,
    meta: {
      title: 'Capstone One Submissions'
    },
    path: '/student/submissions-one',
    name: 'student-submissions-one',
    component: () => import('@/views/student/SubmissionOne/Index.vue')
  },
  {
    beforeEnter: studentAuthenticated,
    meta: {
      title: 'Capstone Two Submissions'
    },
    path: '/student/submissions-two',
    name: 'student-submissions-two',
    component: () => import('@/views/student/SubmissionTwo/Index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
