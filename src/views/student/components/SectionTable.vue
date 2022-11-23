<script setup>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  checkable: Boolean
})

const emit = defineEmits(['select-section'])

const items = computed(() => props.data)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const select = item => {
  emit('select-section', item);
}

</script>

<template>

  <table>
    <thead>
      <tr>
        <th>Section Code</th>
        <th>Room Number</th>
        <th>Time Schedule</th>
        <th>Section Year</th>
        <th>Section Type</th>
        <th>Professor</th>
        <th>Students #</th>
        <th>Groups #</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in itemsPaginated"
        :key="item.id"
      >
        <td data-label="Section Code">
          {{ item.section_code }}
        </td>
        <td data-label="Room Number">
          {{ item.room_number }}
        </td>
        <td data-label="Time Schedule">
          {{ `${item.from_time} - ${item.to_time}` }}
        </td>
        <td data-label="Section Year">
          {{ `${item.from_year} - ${item.to_year}` }}
        </td>
        <td data-label="Section Year">
          {{ item.grouptype ?? null }}
        </td>
        <td data-label="Section Year">
          {{ `${item.professor.firstname} ${item.professor.middlename} ${item.professor.lastname}` }}
        </td>
        <td data-label="Students #">
          {{ item.students.length }}
        </td>
        <td data-label="Students #">
          {{ item.groups.length }}
        </td>
      </tr>
    </tbody>
  </table>
  <div
    class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"
  >
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
