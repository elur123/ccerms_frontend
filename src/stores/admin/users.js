import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useUserStore = defineStore('users', {
  state: () => ({
    list: [],
    request: {
        id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        suffix: '',
        gender: '',
        birtdate: '',
        telephone_number: '',
        address: '',
        email: '',
        password: '',
        usertype_id: '',
        status_id: ''
    },
    status: {
      status: true,
      success: false,
      message: '',
    }
  }),
  actions: {
    fetch() {
      axios.get(`${url}api/users`).then(res => {
        this.list = res.data
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('title', this.request.title)
        formData.append('course', this.request.course)
        formData.append('tags', this.request.tags)
        formData.append('year_from_published', this.request.year_from_published)
        formData.append('year_to_published', this.request.year_to_published)
        formData.append('file', this.request.file)
        formData.append('advisers', JSON.stringify(this.request.adviser))
        formData.append('panels', JSON.stringify(this.request.panel))
        formData.append('members', JSON.stringify(this.request.member))

        axios.post(`${url}api/researcharchives`, formData, 
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.list = res.data.researches
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
        firstname: item.firstname,
        middlename: item.middlename,
        lastname: item.lastname,
        suffix: item.suffix,
        gender: item.gender,
        birtdate: item.birtdate,
        telephone_number: item.telephone_number,
        address: item.address,
        email: item.email,
        password: item.password,
        usertype_id: item.usertype_id,
        status_id: item.status_id
      }
    },
    update() {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('_method', 'PUT')
        formData.append('id', this.request.id)
        formData.append('title', this.request.title)
        formData.append('course', this.request.course)
        formData.append('tags', this.request.tags)
        formData.append('year_from_published', this.request.year_from_published)
        formData.append('year_to_published', this.request.year_to_published)
        formData.append('file', this.request.file)
        formData.append('advisers', JSON.stringify(this.request.adviser))
        formData.append('panels', JSON.stringify(this.request.panel))
        formData.append('members', JSON.stringify(this.request.member))

        axios.post(`${url}api/users/${this.request.id}`, formData,
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.list = res.data.researches
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
    destroy_personnel(id, prefix) {
      axios.delete(`${url}api/${prefix}/${id}`)
    },
    clear() {
        this.request = {
            id: '',
            firstname: '',
            middlename: '',
            lastname: '',
            suffix: '',
            gender: '',
            birtdate: '',
            telephone_number: '',
            address: '',
            email: '',
            password: '',
            usertype_id: '',
            status_id: ''
        }
    },
  }
})
