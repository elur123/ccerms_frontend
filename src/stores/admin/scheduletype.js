import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useScheduleTypeStore = defineStore('scheduletype', {
  state: () => ({
    list: [],
    id: '',
    type: '', 
    status: {
      status: true,
      success: false,
      message: '',
    }
  }),
  actions: {
    fetch() {
      axios.get(`${url}api/scheduletypes`).then(res => {
        this.list = res.data
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        axios.post(`${url}api/scheduletypes`, { type: this.type }).then(res => {
          this.list = res.data.types
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
      this.id = item.id
      this.type = item.type
    },
    update() {
      return new Promise((resolve, reject) => {
        axios.put(`${url}api/scheduletypes/${this.id}`, { type: this.type }).then(res => {
          this.list = res.data.types
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
        this.id = ''
        this.course = ''
    },
  }
})
