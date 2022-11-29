import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useSubmissionOneStore = defineStore('submissionOne', {
  state: () => ({
      submissions: [],
      request: {
        id: '',
        file: {},
        group: '',
        milestone: '',
        submitted_by: '',
        submitted_to: '',
        notes: ''
      },
      status: {
        status: true,
        success: false,
        message: '',
      }
  }),
  actions: {
    fetch(group_id, milestone_id) {
      axios.get(`${url}api/onesubmissions/${group_id}/${milestone_id}`).then(res => {
          this.submissions = res.data
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('file', this.request.file)
        formData.append('group', this.request.group)
        formData.append('milestone', this.request.milestone)
        formData.append('submitted_by', this.request.submitted_by)
        formData.append('submitted_to', this.request.submitted_to)
        formData.append('notes', this.request.notes)

        axios.post(`${url}api/onesubmissions`, formData, 
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.submissions = res.data.submissions
          this.status = {
            status: false,
            success: res.data.status == 200 ? true : false,
            message: res.data.message,
          }
          this.clear()
          resolve(res)
        }).catch(err => {
          this.status = {
            status: false,
            success: false,
            message: 'Server error!',
          }
          reject(err)
        })
      })
    },
    clear() {
      this.request = {
        id: '',
        file: {},
        group: '',
        milestone: '',
        submitted_by: '',
        submitted_to: '',
        notes: ''
      }
    }
  }
})
