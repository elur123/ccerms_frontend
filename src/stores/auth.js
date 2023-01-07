import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    form: {
        email: '',
        password: '',
    },
    request: {
      firstname: '',
      middlename: '',
      lastname: '',
      suffix: '',
      gender: null,
      birthdate: null,
      telephone_number: null,
      address: null,
      email: '',
      password: '',
      password_confirmation: '',
      usertype: 6,
      status: 1,
      course: 1,
      allow_adviser: false,
      allow_panel: false,
      allow_st: false
    },
    user: JSON.parse(localStorage.getItem('user')),
    status: {
        status: false,
        success: false,
        message: '',
    }
  }),
  actions: {
    login() {
        this.resetStatus()
        return new Promise((resolve, reject) => {
            axios.post(`${url}api/auth/login`, this.form).then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.details))
                this.status = {
                  status: true,
                  success: res.data.status == 200 ? true : false,
                  message: res.data.message,
                }
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
    register() {
      return new Promise((resolve, reject) => {
        axios.post(`${url}api/auth/register`, this.request).then(res => {
          this.status = {
            status: true,
            success: res.data.status == 200 ? true : false,
            message: res.data.message,
          }
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
    clear() {
        this.form = {
            email: '',
            password: ''
        }
    },
    resetStatus() {
        this.status = {
            status: false,
            success: false,
            message: '',
        }
    }
  }
})
