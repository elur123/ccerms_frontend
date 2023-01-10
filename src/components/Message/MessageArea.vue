<script setup> 
import { ref } from 'vue'
import { customAlert } from '@/alert'

import TextMessage from '@/components/Message/TextMessage.vue'

const emit = defineEmits(['sendMessage'])

const props = defineProps({
    auth_id: {
        type: Number,
        default: null
    },
    message: {
        type: Object,
        default: null
    }
})

const body = ref('')

const sendMessage = () => {

    if (body.value === '') {
        customAlert('warning', 'Message required')
        return
    }

    emit('sendMessage', { id: props.message.id, body: body.value, user: props.auth_id })

    body.value = ''
}
</script>


<template>
    <div class="message-area hidden md:block w-full h-full">
        <div v-if="props.message.id" class="flex flex-col h-full">
            <div class="header flex items-center border-b-2 h-20 px-2">
                <div class="image-wrapper w-12 h-12 rounded-full mr-3">
                    <img class="rounded-full" src="https://via.placeholder.com/150.png?text=CCERMS" alt="User profile">
                </div>
                <div>
                    <h2 class="name font-bold">{{ props.message.subject }}</h2>
                    <p v-for="participant in props.message.participants" :key="participant.id">{{ `${participant.user.firstname} ${participant.user.middlename} ${participant.user.lastname}` }}</p>
                </div>
            </div>
            <div class="convo flex-1 overflow-y-auto border-b-2 h-20 px-5 py-2">
                <TextMessage v-for="chat in props.message.chats" :key="chat.id" 
                    :isSent="props.auth_id === chat.user.id" 
                    :datetime="chat.created_at">
                    {{ chat.body }}
                </TextMessage>
            </div>
            <div class="text flex items-center h-20 px-2">
                <input class="flex-1 rounded-lg border-transparent focus:border-transparent focus:ring-0" type="text" placeholder="Send message..."
                 v-model="body"
                 @keyup.enter="sendMessage">
            </div>
        </div>
        <div v-else>
            <div class="header flex items-center border-b-2 h-20 px-2">
                <h2 class="name font-bold">Select Message</h2>
            </div>
        </div>
    </div>
</template>