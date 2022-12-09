import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useUserStore = defineStore('users', {
  state: () => ({
    list: [],
    adviser_available: [],
    panel_available: [],
    subjectteacher_available: [],
    access_list: [],
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
        file: {},
        usertype_id: '',
        other_type: '',
        status_id: '',
        allow_adviser: false,
        allow_panel: false,
        allow_st: false,
        access: [],
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
    fetchAvailable() {
      axios.get(`${url}api/users/available`).then(res => {
        this.adviser_available = res.data.advisers;
        this.panel_available = res.data.panels;
        this.subjectteacher_available = res.data.subjectteachers
      })
    },
    refreshAvailability(){
      this.adviser_available.forEach(e => {
        e.available = true
      })
      this.panel_available.forEach(e => {
        e.available = true
      })
    },
    fetchAccessList() {
      this.access_list = []
      axios.get(`${url}api/useraccess`).then(res => {
         res.data.forEach(element => {
          const find = this.access_list.find(e => e.key == element.parent)
          if (find == undefined) {
            this.access_list.push({
              key: element.parent,
              label: element.label,
              data: [{
                id: element.id,
                access: element.access
              }]
            });
          }
          else {
            let index = this.access_list.indexOf(find)
            this.access_list[index].data.push({
              id: element.id,
              access: element.access
            })
          }
        })
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('firstname', this.request.firstname)
        formData.append('middlename', this.request.middlename)
        formData.append('lastname', this.request.lastname)
        formData.append('suffix', this.request.suffix)
        formData.append('gender', this.request.gender)
        formData.append('birtdate', this.request.birthdate)
        formData.append('telephone_number', this.request.telephone_number)
        formData.append('address', this.request.address)
        formData.append('email', this.request.email)
        formData.append('password', this.request.password)
        formData.append('file', this.request.file)
        formData.append('usertype', this.request.usertype_id)
        formData.append('other_type', this.request.other_type)
        formData.append('status', this.request.status_id)
        formData.append('access', this.request.access)
        formData.append('allow_adviser', this.request.allow_adviser)
        formData.append('allow_panel', this.request.allow_panel)
        formData.append('allow_st', this.request.allow_st)

        axios.post(`${url}api/users`, formData, 
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.list = res.data.users
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
        password: '',
        usertype_id: item.usertype_id,
        other_type: item.other_type,
        status_id: item.status_id,
        access: item.access.map(a => a.id),
        allow_adviser: item.allow_adviser == 1 ? true : false,
        allow_panel: item.allow_panel == 1 ? true : false,
        allow_st: item.allow_st == 1 ? true : false
      }
    },
    update() {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('_method', 'PUT')
        formData.append('id', this.request.id)
        formData.append('firstname', this.request.firstname)
        formData.append('middlename', this.request.middlename)
        formData.append('lastname', this.request.lastname)
        formData.append('suffix', this.request.suffix)
        formData.append('gender', this.request.gender)
        formData.append('birtdate', this.request.birthdate)
        formData.append('telephone_number', this.request.telephone_number)
        formData.append('address', this.request.address)
        formData.append('email', this.request.email)
        formData.append('password', this.request.password)
        formData.append('file', this.request.file)
        formData.append('usertype', this.request.usertype_id)
        formData.append('other_type', this.request.other_type)
        formData.append('status', this.request.status_id)
        formData.append('access', this.request.access)
        formData.append('allow_adviser', this.request.allow_adviser)
        formData.append('allow_panel', this.request.allow_panel)
        formData.append('allow_st', this.request.allow_st)

        axios.post(`${url}api/users/${this.request.id}`, formData,
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.list = res.data.users
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
            file: '',
            usertype_id: '',
            other_type: '',
            status_id: '',
            access: [],
            allow_adviser: false,
            allow_panel: false,
            allow_st: false
        }
    },
  }
})
