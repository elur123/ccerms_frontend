import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useStudentDetailsStore = defineStore('studentDetails', {
  state: () => ({
    details: null,
  }),
  actions: {
    fetch(id) {
      axios.get(`${url}api/students/${id}`).then(res => {
        this.details = res.student_details
      })
    },
  }
})
