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

const emit = defineEmits(['select-section', 'destroy-section'])

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

const destroy = item => {
  emit('destroy-section', item);
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
        <th>Title</th>
        <th>Datetime Created</th>
        <th>Datetime Updated</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in itemsPaginated"
        :key="item.id"
      >
        <TableCheckboxCell
          v-if="props.checkable"
          @checked="checked($event, item)"
        />
        <td data-label="Date">
          {{ item.date }}
        </td>
        <td data-label="Panels">
          <span v-for="pan in item.schedulepanels" :key="pan.id" class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {{ pan.fullname }}
          </span>
        </td>
        <td data-label="Status">
          <span v-if="item.status_id == 4" class="p-1 bg-yellow-400 text-white text-sm rounded font-semibold ">{{ item.status.status }}</span>
          <span v-else-if="item.status_id == 5" class="p-1 bg-lime-400 text-white text-sm rounded font-semibold ">{{ item.status.status }}</span>
          <span v-else-if="item.status_id == 6 || item.status_id == 7" class="p-1 bg-red-400 text-white text-sm rounded font-semibold ">{{ item.status.status }}</span>
          <span v-else class="p-1 bg-red-400 text-white text-sm rounded font-semibold ">{{ item.status.status }}</span>
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
