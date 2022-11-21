import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useScheduleStore = defineStore('schedules', {
  state: () => ({
    list: [],
    request: {
        id: '',
        date: '',
        venue: '',
        from_time: '',
        to_time: '',
        scheduletype: '',
        grouptype: 1,
        group: '',
        status: 4,
        panels: [],
    },
    status: {
      status: true,
      success: false,
      message: '',
    }
  }),
  actions: {
    fetch() {
      axios.get(`${url}api/schedules`).then(res => {
        this.list = res.data
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        axios.post(`${url}api/schedules`, this.request, 
        { 
          headers: { 'Content-Type': 'application/json' } 
        }
        ).then(res => {
          this.list = res.data.schedules
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
        date: item.date,
        venue: item.venue,
        from_time: item.from_time,
        to_time: item.to_time,
        scheduletype: item.scheduletype_id,
        grouptype: item.grouptype_id,
        group: item.group_id,
        status: item.status_id,
        panels: item.schedulepanels
      }
    },
    update() {
      return new Promise((resolve, reject) => {

        axios.put(`${url}api/schedules/${this.request.id}`, this.request,
        { 
          headers: { 'Content-Type': 'application/json' } 
        }
        ).then(res => {
          this.list = res.data.schedules
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
            date: '',
            venue: '',
            from_time: '',
            to_time: '',
            scheduletype: '',
            grouptype: 1,
            group: '',
            status: 4,
            panels: [],
        }
    },
  }
})
