<script setup>
const props = defineProps({
  isSent: Boolean,
})

</script>

<template>
    <div :class="isSent ? 'text-right' : 'text-left'" class="py-2 px-3">
        <span :class="isSent ? 'bg-yellow-400 text-white rounded-t-lg rounded-l-lg' : 'bg-slate-300 rounded-t-lg rounded-r-lg'" class="py-2 px-3">
            <slot />
        </span>
        <p class="py-1 text-muted text-sm">Datetime</p>
    </div>
</template>