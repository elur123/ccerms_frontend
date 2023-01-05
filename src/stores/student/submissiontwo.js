import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useSubmissionTwoStore = defineStore('submissionTwo', {
  state: () => ({
      submissions: [],
      request: {
        id: '',
        file: {},
        group: '',
        milestone: '',
        submitted_by: '',
        submitted_to: '',
        notes: '',
        comment: {
          user: '',
          file: {},
          comment: ''
        }
      },
      status: {
        status: true,
        success: false,
        message: '',
      }
  }),
  actions: {
    fetch(group_id, milestone_id) {
      axios.get(`${url}api/twosubmissions/${group_id}/${milestone_id}`).then(res => {
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

        axios.post(`${url}api/twosubmissions`, formData, 
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
        notes: item.notes,
        comment: {
          user: '',
          file: {},
          comment: ''
        }
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

        axios.post(`${url}api/twosubmissions/${this.request.id}`, formData, 
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
    comment(submission_id) {
      return new Promise((resolve, reject) => {

        let formData = new FormData();
        formData.append('user', this.request.comment.user)
        formData.append('file', this.request.comment.file)
        formData.append('comment', this.request.comment.comment)

        axios.post(`${url}api/twosubmissions/comments/${submission_id}`, formData,
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          const index = this.submissions.indexOf(this.submissions.find(e => e.id == submission_id));
          this.submissions[index].comments = res.data.comments
          this.status = {
            status: false,
            success: res.data.status == 200 ? true : false,
            message: res.data.message,
          }
          this.request.comment.comment = ''
          this.request.comment.file = {}
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

        axios.delete(`${url}api/twosubmissions/${this.request.id}`, this.request,
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
        notes: '',
        comment: {
          user: '',
          file: {},
          comment: ''
        }
      }
    }
  }
})
