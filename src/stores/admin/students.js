import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useStudentStore = defineStore('students', {
  state: () => ({
    list: [],
    available: [],
    section_available: [],
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
        usertype_id: 6,
        grouptype: 1,
        course_id: 1,
        status_id: '',
    },
    status: {
      status: true,
      success: false,
      message: '',
    }
  }),
  actions: {
    fetch() {
      axios.get(`${url}api/students`).then(res => {
        this.list = res.data
      })
    },
    fetchAvailable() {
      axios.get(`${url}api/students/available`).then(res => {
          this.available = res.data.filter(e => e.available)
      })
    },
    fetchSectionAvailable() {
      axios.get(`${url}api/students/section_available`).then(res => {
          this.section_available = res.data.map(function(s) {
            return {
              id: s.id,
              fullname: s.fullname,
              email: s.email,
              section_one: s.section_one,
              section_two: s.section_two,
              is_available: true
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
        formData.append('grouptype', this.request.grouptype)
        formData.append('course', this.request.course_id)
        formData.append('status', this.request.status_id)

        axios.post(`${url}api/students`, formData, 
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.list = res.data.students
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
        grouptype: item.studentdetail.grouptype_id,
        course_id: item.studentdetail.course_id,
        status_id: item.status_id
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
        formData.append('grouptype', this.request.grouptype)
        formData.append('course', this.request.course_id)
        formData.append('status', this.request.status_id)

        axios.post(`${url}api/students/${this.request.id}`, formData,
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.list = res.data.students
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
            file: {},
            usertype_id: 6,
            other_type: '',
            grouptype: 1,
            course_id: 1,
            status_id: ''
        }
    },
  }
})
