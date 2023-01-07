import {
  mdiAccountCircle,
  mdiDesktopMac,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiCog
} from '@mdi/js'

export const adminMenu =  [
  '',
  [
    {
      to: '/admin/dashboard',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    }
  ],
  'General',
  [
    {
      to: '/admin/students',
      label: 'Students',
      icon: mdiTable
    },
    {
      to: '/admin/groups',
      label: 'Groups',
      icon: mdiSquareEditOutline
    },
    {
      to: '/admin/sections',
      label: 'Sections',
      icon: mdiTelevisionGuide
    },
  ],
  'Events',
  [
    {
      to: '/admin/defenseschedules',
      label: 'Defense Schedules',
      icon: mdiTable
    },
    {
      label: 'Submissions',
      icon: mdiSquareEditOutline,
      menu: [
        { label: 'Capstone 1', to: '/admin/submissions-one' },
        { label: 'Capstone 2', to: '/admin/submissions-two' }
      ]
    },
  ],
  'Settings',
  [
    {
      to: '/admin/courses',
      label: 'Courses',
      icon: mdiCog
    },
    {
      to: '/admin/users',
      label: 'Users',
      icon: mdiCog
    },
    {
      label: 'Milestone Setup',
      icon: mdiCog,
      menu: [
        { label: 'Capstone 1', to: '/admin/milestone/one' },
        { label: 'Capstone 2', to: '/admin/milestone/two' }
      ]
    },
    {
      to: '/admin/minutesetup',
      label: 'Minute Setup',
      icon: mdiCog
    },
    {
      to: '/admin/researcharchives',
      label: 'Research Archives',
      icon: mdiCog
    },
    {
      to: '/admin/scheduletypes',
      label: 'Schedule Types',
      icon: mdiCog
    },
  ]
]

export const studentMenu =  [
  '',
  [
    {
      to: '/student/dashboard',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    }
  ],
  'General',
  [
    {
      to: '/student/group',
      label: 'Group',
      icon: mdiSquareEditOutline
    },
    {
      to: '/student/section',
      label: 'Section',
      icon: mdiTelevisionGuide
    },
    {
      to: '/student/research-archives',
      label: 'Research Archives',
      icon: mdiTelevisionGuide
    },
  ],
  'Events',
  [
    {
      to: '/student/schedules',
      label: 'Defense Schedules',
      icon: mdiTable
    },
    {
      label: 'Submissions',
      icon: mdiSquareEditOutline,
      menu: [
        { label: 'Capstone 1', to: '/student/submissions-one' },
        { label: 'Capstone 2', to: '/student/submissions-two' }
      ]
    },
  ],

]
