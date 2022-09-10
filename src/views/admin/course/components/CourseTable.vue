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

const emit = defineEmits(['select-course', 'destroy-course'])

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
  emit('select-course', item);
}

const destroy = item => {
  emit('destroy-course', item);
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
        <th>Course</th>
        <th>Created</th>
        <th>Updated</th>
        <th />
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
        <!-- <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="item.name"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td> -->
        <td data-label="Code">
          {{ item.code }}
        </td>
        <td data-label="Course">
          {{ item.course.toUpperCase() }}
        </td>
        <td 
          data-label="Created"
          class="lg:w-1 whitespace-nowrap"
        >
          <small
            class="text-gray-500 dark:text-gray-400"
            :title="item.created_at"
          >{{ item.created_at }}</small>
        </td>
        <td 
          data-label="Updated"
          class="lg:w-1 whitespace-nowrap"
        >
          <small
            class="text-gray-500 dark:text-gray-400"
            :title="item.updated_at"
          >{{ item.updated_at }}</small>
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
