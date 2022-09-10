import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useCourseStore = defineStore('course', {
  state: () => ({
    list: [],
    id: '',
    course: '', 
    status: {
      status: false,
      success: false,
      message: '',
    }
  }),
  actions: {
    fetch() {
      axios.get(`${url}api/courses`).then(res => {
        this.list = res.data
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        axios.post(`${url}api/courses`, { course: this.course }).then(res => {
          this.list = res.data.courses
          this.status = {
            status: true,
            success: res.data.status == 200 ? true : false,
            message: res.data.message,
          }
          this.clear()
          resolve(res)
        }).catch(err => {
          this.status = {
            status: true,
            success: false,
            message: 'Server error!',
          }
          reject(err)
        })
      })
    },
    select(item) {
      this.id = item.id
      this.course = item.course
    },
    update() {
      return new Promise((resolve, reject) => {
        axios.put(`${url}api/courses/${this.id}`, { course: this.course }).then(res => {
          this.list = res.data.courses
          this.status = {
            status: true,
            success: res.data.status == 200 ? true : false,
            message: res.data.message,
          }
          this.clear()
          resolve(res)
        }).catch(err => {
          this.status = {
            status: true,
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
