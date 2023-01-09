<script setup>
import { ref } from 'vue'
import SectionMain from '@/components/SectionMain.vue'

import Sidebar from '@/components/Message/Sidebar.vue'
import MessageArea from '@/components/Message/MessageArea.vue'

</script>

<template>
    <div class="flex" style="    height: calc(100vh - 57px);">
        <Sidebar />
        <MessageArea />
    </div>
</template>