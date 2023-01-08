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
    minute: {
      id: null,
      group: null,
      schedule: null,
      prepared: null,
      list: [],
    },
    status: {
      status: true,
      success: false,
      message: '',
    },
    hasMinute: false,
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

      this.minute.schedule = item.id
      this.minute.group = item.group
      this.hasMinute = false

      if (item.scheduleminute !== null) {
        
        this.hasMinute = true
        this.minute.list = item.scheduleminute.lists.map(function(e) {
          return {
            id: e.id,
            label: e.minutelist.label,
            label_order: e.minutelist.label_order,
            comment: e.comment
          }
        })
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
    create_minute() {
      return new Promise((resolve, reject) => {

        axios.post(`${url}api/schedules/minute`, this.minute,
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

        this.minute = {
          id: null,
          schedule: null,
          prepared: null,
          group: null,
          list: [],
        }

        this.hasMinute = false
    },
  }
})
