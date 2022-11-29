import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useStudentDetailsStore = defineStore('studentDetails', {
  state: () => ({
    details: null,
    section_list: [],
    schedules: [],
    onemilestones: [],
    twomilestones: []
  }),
  actions: {
    fetch(id) {
      axios.get(`${url}api/students/${id}`).then(res => {
        this.details = res.data.student_details
        this.section_list = res.data.section_list
        this.schedules = res.data.schedules
        this.onemilestones = res.data.onemilesones
        this.twomilestones = res.data.twomilesones
      })
    },
  }
})
