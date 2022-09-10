import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useMilestoneTwoStore = defineStore('milestonetwo', {
  state: () => ({
    list: [],
    request: {
      id: '',
      milestone: '',
      file: {},
      milestone_type: '',
      percent: '',
      ordernumber: '', 
    },
    status: {
      status: true,
      success: false,
      message: '',
    }
  }),
  actions: {
    fetch() {
      axios.get(`${url}api/twomilestones`).then(res => {
        this.list = res.data
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('milestone', this.request.milestone)
        formData.append('file', this.request.file)
        formData.append('milestone_type', this.request.milestone_type)
        formData.append('percent', this.request.percent)
        formData.append('ordernumber', this.request.ordernumber)

        axios.post(`${url}api/twomilestones`, formData, 
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.list = res.data.milestones
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
        milestone: item.milestone,
        file: {},
        milestone_type: item.milestone_type,
        percent: item.percent,
        ordernumber: item.ordernumber, 
      }
    },
    update() {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('_method', 'PUT')
        formData.append('milestone', this.request.milestone)
        formData.append('file', this.request.file)
        formData.append('milestone_type', this.request.milestone_type)
        formData.append('percent', this.request.percent)
        formData.append('ordernumber', this.request.ordernumber)

        axios.post(`${url}api/twomilestones/${this.request.id}`, formData,
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.list = res.data.milestones
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
    destroy() {
      console.log(this.id);
    },
    clear() {
        this.request = {
          id: '',
          milestone: '',
          file: {},
          milestone_type: '',
          percent: '',
          ordernumber: '', 
        }
    },
  }
})
