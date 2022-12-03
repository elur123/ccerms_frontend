<script setup>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan, mdiMagnify } from '@mdi/js'
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

const emit = defineEmits(['select-submission', 'show-submission', 'delete-submission'])

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
  emit('select-submission', item);
}

const show = item => {
  emit('show-submission', item);
}

const destroy = item => {
  emit('delete-submission', item);
}


</script>

<template>

  <table>
    <thead>
      <tr>
        <th>Revision #</th>
        <th>Milestone</th>
        <th>File</th>
        <th>Date time Submitted</th>
        <th>Submitted By</th>
        <th>Submitted To</th>
        <th>Date time Checked</th>
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
        <td data-label="Revision #">
          {{ item.revision_number }}
        </td>
        <td data-label="Milestone">
          {{ item.milestone }}
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
              type="justify-start lg:justify-end"
              no-wrap
            >
              <BaseButton
                v-if="item.status_id == 1"
                color="info"
                :icon="mdiEye"
                small
                @click="select(item)"
              />
              <BaseButton
                v-if="item.status_id == 1"
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="destroy(item)"
              />
              <BaseButton
                color="info"
                :icon="mdiMagnify"
                small
                @click="show(item)"
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
