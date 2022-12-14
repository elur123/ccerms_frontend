import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useSectionStore = defineStore('sections', {
  state: () => ({
    list: [],
    request: {
        id: '',
        section_code: '',
        room_number: '',
        user: '',
        grouptype: '',
        from_time: '',
        to_time: '',
        from_year: '',
        to_year: '',
        student: [],
        group: [],
        semester: '',
    },
    status: {
      status: true,
      success: false,
      message: '',
    }
  }),
  actions: {
    fetch() {
      axios.get(`${url}api/sections`).then(res => {
        this.list = res.data
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        axios.post(`${url}api/sections`, this.request, 
        { 
          headers: { 'Content-Type': 'application/json' } 
        }
        ).then(res => {
          this.list = res.data.sections
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
        section_code: item.section_code,
        room_number: item.room_number,
        user: item.user_id,
        grouptype: item.grouptype_id,
        from_time: item.from_time,
        to_time: item.to_time,
        from_year: item.from_year,
        to_year: item.to_year,
        student: item.sectionstudent,
        group: item.sectiongroup,
        semester: item.semester
      }
    },
    update() {
      return new Promise((resolve, reject) => {

        axios.put(`${url}api/sections/${this.request.id}`, this.request,
        { 
          headers: { 'Content-Type': 'application/json' } 
        }
        ).then(res => {
          this.list = res.data.sections
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
          section_code: '',
          room_number: '',
          user: '',
          grouptype: '',
          from_time: '',
          to_time: '',
          from_year: '',
          to_year: '',
          student: [],
          group: [],
          semester: ''
        }
    },
  }
})
