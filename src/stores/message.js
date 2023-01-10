import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config.js'

export const useMessageStore = defineStore('messages', {
  state: () => ({
    chats: [],
    message: {
        id: null,
        subject: '',
        img: '',
        participants: [],
        chats: []
    },
    chat: {
        subject: '',
        participants: []
    },
    conversation: {
        user: '',
        body: ''
    }
  }),
  actions: {

    fetch(user_id) {
      axios.get(`${url}api/messages/${user_id}`).then(res => {

        this.chats = res.data
      })
    },

    createChat(user_id) {

        return new Promise((resolve, reject) => {
            axios.post(`${url}api/messages/${user_id}`, this.chat).then(res => {
                
                this.conversations = res.data
                resolve(res)
            }).catch(err => {
               
                reject(err)
            })
        })
    },

    selectChat(item) {
        
        this.message.id = item.chat.id
        this.message.subject = item.chat.subject
        this.message.img = item.chat.img
        this.message.participants = item.chat.participants.filter(e => e.user.id !== item.auth_id)
        this.getConversation(item.chat.id)
    },

    getConversation(message_id) {

        axios.get(`${url}api/messages/convo/${message_id}`).then(res => {

            this.message.chats = res.data
        })
    },

    createConversation(message) {

        this.conversation = {
            user: message.user,
            body: message.body
        }

        return new Promise((resolve, reject) => {
            axios.post(`${url}api/messages/convo/${message.id}`, this.conversation).then(res => {
                
                this.message.chats = res.data.convo
                resolve(res)
            }).catch(err => {
               
                reject(err)
            })
        })
    }
  }
})
