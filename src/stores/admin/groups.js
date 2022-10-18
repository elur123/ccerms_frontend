import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useGroupStore = defineStore('groups', {
  state: () => ({
    list: [],
    request: {
        id: '',
        title: '',
        groupname: '',
        course: '',
        progress_one: '',
        progress_two: '',
        onemilestone: '',
        twomilestone: '',
        milestone: '',
        progress: '',
        status: '',
        type: '',
        member: [],
        adviser: [],
        panel: []
    },
    status: {
      status: true,
      success: false,
      message: '',
    }
  }),
  actions: {
    fetch() {
      axios.get(`${url}api/groups`).then(res => {
        this.list = res.data
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        this.request.adviser = JSON.stringify(this.request.adviser)
        this.request.panel = JSON.stringify(this.request.panel)
        this.request.member = JSON.stringify(this.request.member)
        axios.post(`${url}api/groups`, this.request, 
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
        ).then(res => {
          this.list = res.data.groups
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
        
      }
    },
    update() {
      return new Promise((resolve, reject) => {
        axios.post(`${url}api/groups/${this.request.id}`, this.request,
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
            title: '',
            groupname: '',
            course: '',
            progress_one: '',
            progress_two: '',
            onemilestone: '',
            twomilestone: '',
            status: '',
            type: '',
            member: [],
            adviser: [],
            panel: []
        }
    },
  }
})
