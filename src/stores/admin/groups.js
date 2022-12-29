import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useGroupStore = defineStore('groups', {
  state: () => ({
    list: [],
    section_available: [],
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
        this.section_available = res.data.map(function (grp) {
          return {
            id: grp.id,
            groupname: grp.groupname,
            is_available: true
          }
        })
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
          res.member_registered = JSON.parse(this.request.member)
          resolve(res)
          this.clear()
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
        title: item.title,
        groupname: item.groupname,
        course: item.course_id,
        progress_one: item.progress_one,
        progress_two: item.progress_two,
        onemilestone: item.onemilestone_id,
        twomilestone: item.twomilestone_id,
        milestone: item.type_id > 1 ? item.twomilestone_id : item.onemilestone_id,
        progress: item.type_id > 1 ? item.progress_two : item.progress_one,
        status: item.status_id,
        type: item.type_id,
        member: this.personnel_data(item.member),
        adviser: this.personnel_data(item.adviser),
        panel: this.personnel_data(item.panel)
      }
    },
    update() {
      return new Promise((resolve, reject) => {
        this.request._method = 'put';
        this.request.adviser = JSON.stringify(this.request.adviser)
        this.request.panel = JSON.stringify(this.request.panel)
        this.request.member = JSON.stringify(this.request.member)
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
          
          res.member_registered = JSON.parse(this.request.member)
          resolve(res)
          this.clear()
        }).catch(err => {
          console.log(err);
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
    personnel_data(arr) {
      var data = [];
      arr.forEach(element => {
        data.push({
          parent_id: element.id,
          id: element.user.id,
          fullname: `${element.user.lastname}, ${element.user.firstname}, ${element.user.middlename}`,
          available: false,
          is_create: false,
        })
      });

      return data;
    }
  }
})
