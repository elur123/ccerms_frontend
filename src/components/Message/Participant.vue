<script setup>

const props = defineProps({
    img: {
        type: String,
        default: null
    },
    subject: {
        type: String,
        default: null
    }
})
</script>


<template>
    <div class="recipients flex items-center p-2 mb-3 cursor-pointer hover:bg-slate-100">
        <div class="relative image-wrapper w-12 h-12 rounded-full mr-3">
            <img class="rounded-full" src="https://via.placeholder.com/150.png?text=CCERMS" alt="User profile">
            <span class="absolute top-0 right-0 rounded-full text-white text-xs bg-red-400 px-[0.5rem] py-[0.15rem]">2</span>
        </div>
        <div class="details">
            <h2 class="name font-bold">{{ props.subject }}</h2>
        </div>
    </div>
</template>