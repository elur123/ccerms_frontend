<script setup>
import Participant from '@/components/Message/Participant.vue'

const emit = defineEmits(['select'])

// Props
const props = defineProps({
  auth_id: {
    type: Number,
    default: null
  },
  chats: {
    type: Array,
    default: []
  }
})

const select = (chat) => {

    emit('select', { chat: chat, auth_id: props.auth_id});
}

</script>

<template>
    <div class="sidebar w-full md:w-3/12 h-full border-r-2">
        <div class="header overflow-hidden flex items-center h-20 px-2">
            <h1 class="font-bold text-3xl mr-2">Chats</h1>
            <input class="flex-1 rounded-lg border-transparent focus:border-transparent focus:ring-0" type="text" placeholder="Search User">
        </div>
        <div class="chats">
            
            <Participant v-for="chat in chats" :key="chat.id" 
              img="img.png" 
              :subject="chat.subject"
              @click="select(chat)"
            />
        </div>
    </div>
</template>