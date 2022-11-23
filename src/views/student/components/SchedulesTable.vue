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
        <th>Schedule Date</th>
        <th>Venue</th>
        <th>Time Schedule</th>
        <th>Schedule Type</th>
        <th>Group name</th>
        <th>Group Type</th>
        <th>Panelist</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in itemsPaginated"
        :key="item.id"
      >
        <td data-label="Schedule Date">
          {{ item.date }}
        </td>
        <td data-label="Venue">
          {{ item.venue }}
        </td>
        <td data-label="Time Schedule">
          {{ `${item.from_time} - ${item.to_time}` }}
        </td>
        <td data-label="Schedule Type">
          {{ item.scheduletype ?? null }}
        </td>
        <td data-label="Group name">
          {{ item.groupname ?? null }}
        </td>
        <td data-label="Group Type">
          {{ item.grouptype ?? null }}
        </td>
        <td data-label="Panelist">
          <span v-for="pan in item.panels" :key="pan.id" class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {{ pan.fullname }}
          </span>
        </td>
        <td data-label="Status">
          <span v-if="item.status_id == 4" class="p-1 bg-yellow-400 text-white text-sm rounded font-semibold ">{{ item.status }}</span>
          <span v-else-if="item.status_id == 5" class="p-1 bg-lime-400 text-white text-sm rounded font-semibold ">{{ item.status }}</span>
          <span v-else-if="item.status_id == 6 || item.status_id == 7" class="p-1 bg-red-400 text-white text-sm rounded font-semibold ">{{ item.status }}</span>
          <span v-else class="p-1 bg-red-400 text-white text-sm rounded font-semibold ">{{ item.status }}</span>
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
