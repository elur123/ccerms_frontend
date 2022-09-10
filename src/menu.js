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

export default [
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
      to: '/admin/submissions',
      label: 'Submissions',
      icon: mdiSquareEditOutline
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
