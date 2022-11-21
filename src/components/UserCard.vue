<script setup>
import { computed, ref } from 'vue'
import { mdiCheckDecagram } from '@mdi/js'
import BaseLevel from '@/components/BaseLevel.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import PillTag from '@/components/PillTag.vue'

const userSwitchVal = ref([])

const props = defineProps({
  user: {
    type: Object,
    default: null
  },
  checkable: Boolean
})

</script>

<template>
  <CardBox rounded="">
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatar class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">
          Howdy, <b>{{ `${user.firstname} ${user.middlename} ${user.lastname}` }}</b>!
        </h1>
        <p>Last login <b>12 mins ago</b></p>
        <div class="flex justify-center md:block">
          <PillTag
            text="Verified"
            type="info"
            :icon="mdiCheckDecagram"
          />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
