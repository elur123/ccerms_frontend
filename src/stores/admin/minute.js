import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useMinuteStore = defineStore('minute', {
  state: () => ({
    list: [],
    request: {
        title: '',
        list: [],
    },
    status: {
      status: true,
      success: false,
      message: '',
    }
  }),
  actions: {
    fetch() {
      axios.get(`${url}api/minutes`).then(res => {
        this.list = res.data
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        axios.post(`${url}api/minutes`, this.request).then(res => {
          this.list = res.data.minutes
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
      this.request.title = item.title
      this.request.list = item.list
    },
    update() {
      return new Promise((resolve, reject) => {
        axios.put(`${url}api/minutes/${this.id}`, this.request).then(res => {
          this.list = res.data.minutes
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
        title: '',
        list: []
       }
    },
  }
})
