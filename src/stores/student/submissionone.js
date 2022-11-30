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
    select(item) {
      this.request = {
        id: item.id,
        file: {},
        group: item.group_id,
        milestone: item.onemilestone_id,
        submitted_by: item.send_by,
        submitted_to: item.send_to,
        notes: item.notes
      }
    },
    update() {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('_method', 'PUT')
        formData.append('file', this.request.file)
        formData.append('group', this.request.group)
        formData.append('milestone', this.request.milestone)
        formData.append('submitted_by', this.request.submitted_by)
        formData.append('submitted_to', this.request.submitted_to)
        formData.append('notes', this.request.notes)

        axios.post(`${url}api/onesubmissions/${this.request.id}`, formData, 
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
    delete() {
      return new Promise((resolve, reject) => {

        axios.delete(`${url}api/onesubmissions/${this.request.id}`, this.request,
        { 
          headers: { 'Content-Type': 'application/json' } 
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
