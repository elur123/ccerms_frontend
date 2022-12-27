<script setup>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

import { useResearcharchiveStore } from '@/stores/admin/researcharchives.js';
const researchStore = useResearcharchiveStore()

const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  search: {
    string: String,
    default: ''
  },
  checkable: Boolean
})

const emit = defineEmits(['select-archive', 'destroy-archive'])

const items = computed(() => props.data)

const checkedRows = ref([])

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 1; i <= props.data.last_page; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const select = item => {
  emit('select-archive', item);
}

const destroy = item => {
  emit('destroy-archive', item);
}

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === client.id)
  }
}
</script>

<template>
  <div
    v-if="checkedRows.length"
    class="p-3 bg-gray-100/50 dark:bg-gray-800"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="props.checkable" />
        <!-- <th /> -->
        <th>Code</th>
        <th>Research Title</th>
        <th>Course</th>
        <th>Tags</th>
        <th>File</th>
        <th>Year Published</th>
        <th>Members</th>
        <th>Adviser(s)</th>
        <th>Panel(s)</th>
      </tr>
    </thead>
    <tbody v-if="props.data.total > 0">
      <tr
        v-for="item in props.data.data"
        :key="item.id"
      >
        <TableCheckboxCell
          v-if="props.checkable"
          @checked="checked($event, item)"
        />
        <td data-label="Code">
          {{ item.code }}
        </td>
        <td data-label="Title">
          {{ item.title }}
        </td>
        <td data-label="Course">
          {{ item.course.course }}
        </td>
        <td data-label="Tags">
          {{ item.tags }}
        </td>
        <td data-label="File">
          <a :href="item.file_url" class="text-blue-400">{{ item.file }}</a>
        </td>
        <td data-label="Year Published">
          {{ item.year_from_published }} - {{ item.year_to_published }}
        </td>
        <td data-label="Member(s)">
          <span v-for="mem in item.member" :key="mem.id" class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {{ mem.fullname.toUpperCase() }}
          </span>
        </td>
        <td data-label="Adviser(s)">
          <span v-for="adv in item.adviser" :key="adv.id" class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {{ adv.fullname.toUpperCase() }}
          </span>
        </td>
        <td data-label="Panel(s)">
          <span v-for="pan in item.panel" :key="pan.id" class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {{ pan.fullname.toUpperCase() }}
          </span>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="select(item)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="destroy(item)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="10">No research archive data</td>
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
          :active="page === props.data.current_page"
          :label="page"
          small
          @click="researchStore.fetch(props.search, page)"
        />
      </BaseButtons>
      <small>Page {{ props.data.current_page }} of {{ props.data.last_page }}</small>
    </BaseLevel>
  </div>
</template>
