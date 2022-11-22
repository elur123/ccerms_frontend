import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useStudentDetailsStore = defineStore('studentDetails', {
  state: () => ({
    details: null,
    section_list: [],
    onemilestone: [],
    twomilestone: []
  }),
  actions: {
    fetch(id) {
      axios.get(`${url}api/students/${id}`).then(res => {
        this.details = res.data.student_details
        this.section_list = res.data.section_list
        this.onemilestone = res.data.onemilesones
        this.twomilestone = res.data.twomilesones
      })
    },
  }
})
