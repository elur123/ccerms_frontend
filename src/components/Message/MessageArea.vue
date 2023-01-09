<script setup>
import TextMessage from '@/components/Message/TextMessage.vue'
</script>


<template>
    <div class="message-area hidden md:block w-full h-full">
        <div class="flex flex-col h-full">
            <div class="header flex items-center border-b-2 h-20 px-2">
                <div class="image-wrapper w-12 h-12 rounded-full mr-3">
                    <img class="rounded-full" src="https://via.placeholder.com/150.png?text=CCERMS" alt="User profile">
                </div>
                <h2 class="name font-bold">Profile Name</h2>
            </div>
            <div class="convo flex-1 overflow-y-auto border-b-2 h-20 px-5 py-2">
                <TextMessage :isSent="false" >Text Left</TextMessage>
                <TextMessage :isSent="true" >Text Right</TextMessage>
                <TextMessage :isSent="true" >Text Right</TextMessage>
            </div>
            <div class="text flex items-center h-20 px-2">
                <input class="flex-1 rounded-lg border-transparent focus:border-transparent focus:ring-0" type="text" placeholder="Send message...">
            </div>
        </div>
    </div>
</template>