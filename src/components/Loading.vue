<script setup>
import Loader from '@/components/Icons/Loader.vue'
</script>

<template>
    <div class="flex items-center flex-col justify-center fixed inset-0 w-screen h-screen overflow-hidden z-60">

        <div class="absolute flex items-center flex-col justify-center inset-0 bg-slate-400 opacity-75">
            <Loader />
        </div>

    </div>
</template>