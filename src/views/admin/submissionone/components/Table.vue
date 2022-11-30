<script setup>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan, mdiMagnify  } from '@mdi/js'
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

const emit = defineEmits(['select-submission'])

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
        <th>Revision #</th>
        <th>Milestone</th>
        <th>Group</th>
        <th>File</th>
        <th>Datetime Submitted</th>
        <th>Submitted By</th>
        <th>Submitted To</th>
        <th>Datetime Checked</th>
        <th>Checked By</th>
        <th>Status</th>
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
         <td data-label="Revision #">
          {{ item.revision_number }}
        </td>
        <td data-label="Milestone">
          {{ item.milestone }}
        </td>
        <td data-label="Group">
          {{ item.groupname }}
        </td>
        <td data-label="File">
          {{ item.file }}
        </td>
        <td data-label="Date time Submitted">
          {{ item.sendby_datetime }}
        </td>
        <td data-label="Submitted By">
          {{ item.submitted_by }}
        </td>
        <td data-label="Submitted To">
          {{ item.submitted_to }}
        </td>
        <td data-label="Date time Checked">
          {{ item.approved_datetime }}
        </td>
        <td data-label="Checked By">
          {{ item.checked_by }}
        </td>
        <td data-label="Status">
          <span v-if="item.status_id == 1" class="p-1 bg-yellow-400 text-white text-sm rounded font-semibold ">{{ item.status }}</span>
          <span v-else-if="item.status_id == 2" class="p-1 bg-lime-400 text-white text-sm rounded font-semibold ">{{ item.status }}</span>
          <span v-else class="p-1 bg-red-400 text-white text-sm rounded font-semibold ">{{ item.status }}</span>
        </td>
        <td data-label="Actions">
            <BaseButtons
              v-if="item.status_id == 1"
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
                color="info"
                :icon="mdiMagnify"
                small
                @click="select(item)"
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
