import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    form: {
        email: '',
        password: '',
    },
    user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null,
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
