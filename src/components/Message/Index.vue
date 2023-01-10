<script setup>
import { ref } from 'vue'
import SectionMain from '@/components/SectionMain.vue'

import Sidebar from '@/components/Message/Sidebar.vue'
import MessageArea from '@/components/Message/MessageArea.vue'

import { useMessageStore } from '@/stores/message.js'
import { useAuthStore } from '@/stores/auth.js'

const messageStore = useMessageStore()
const authStore = useAuthStore()

messageStore.fetch(authStore.user.id)

</script>

<template>
    <div class="flex" style="    height: calc(100vh - 57px);">
        <Sidebar 
            :auth_id="authStore.user.id" 
            :chats="messageStore.chats"
            @select="messageStore.selectChat" 
        />
        <MessageArea 
            :auth_id="authStore.user.id" 
            :message="messageStore.message" 
            @sendMessage="messageStore.createConversation"
        />
    </div>
</template>