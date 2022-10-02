<template>
  <users-query v-slot="{ items, loading }" v-bind="filterUsersBy">
    <v-autocomplete
      v-bind="$attrs"
      :items="items"
      :loading="loading"
      :model-value="modelValue?.id"
      :label="t('messages.user')"
      :item-title="filterByField"
      item-value="id"
      :type="fieldType"
      variant="outlined"
      :return-object="true"
      clearable
      density="compact"
      class="select-group"
      data-test="listing.user"
      @update:search="onSearch"
      @update:model-value="onSelectedUser"
    >
      <template #prepend>
        <v-select
          v-model="filterByField"
          :items="filterByFields.map((item) => item.field)"
          :label="t('action.filter')"
          variant="outlined"
          density="compact"
          data-test="listing.user.fields"
          hide-details
        />
      </template>
    </v-autocomplete>
  </users-query>

  <v-expand-transition>
    <div v-if="user">
      <div class="text-h5 mt-5 mt-3">You selected next user</div>
      <v-table density="compact">
        <tbody>
          <tr v-for="(field, i) in userFields" :key="i">
            <td class="w-25">
              <small class="text-uppercase text-muted font-weight-bold">
                {{ field.text }}
              </small>
            </td>
            <td>
              {{ field.value }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-expand-transition>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import UsersQuery from './RenderlessUsersQuery.vue'
import { Users } from '@/plugins/apollo/schemaTypesGenerated'

const props = defineProps({
  modelValue: {
    type: Object as () => Users,
    required: false,
  },
})

const { t } = useI18n()
const user = ref<Users>()

// to set existing user set watch
onMounted(() => {
  watch(
    () => props.modelValue,
    () => {
      if (props.modelValue !== undefined) {
        onSelectedUser(props.modelValue)
      }
    }
  )
})

const search = ref('')
const filterByField = ref('id')
const filterByFields = [
  { field: 'id', type: 'number' },
  { field: 'first_name', type: 'text' },
  { field: 'last_name', type: 'text' },
  { field: 'email', type: 'email' },
]

const fieldType = computed(() => {
  const selectedField = filterByFields.find((item) => item.field === filterByField.value)
  if (!selectedField) {
    throw new Error('Field undefined')
  }
  return selectedField.type
})

const filterUsersBy = computed(() => {
  if (search.value === '') return {}

  // field id must be array of id
  if (filterByField.value === 'id') {
    return { [filterByField.value]: [search.value] }
  }
  return { [filterByField.value]: search.value }
})

const userFields = computed(() => {
  if (!user) return []

  return [
    {
      text: t('messages.id'),
      value: user.value?.id,
    },
    {
      text: t('messages.name'),
      value: `${user.value?.first_name} ${user.value?.last_name}`,
    },
    {
      text: t('messages.email'),
      value: user.value?.email,
    },
    {
      text: t('messages.status'),
      value: user.value?.status,
    },
    {
      text: t('messages.postal_code'),
      value: user.value?.postal_code,
    },
    {
      text: t('messages.location'),
      value: `${user.value?.city?.state.country.name}, ${user.value?.city?.state.name}, ${user.value?.city?.name}`,
    },
  ]
})

const onSearch = (value: string) => {
  search.value = value
}

const onSelectedUser = (selectedUser: Users | null) => {
  // if used option "clearable" need to reset selected object
  user.value = selectedUser === null ? undefined : selectedUser
}
</script>

<style lang="scss">
.select-group {
  .v-input__prepend {
    margin-inline-end: 0;
    --v-input-padding-top: 0;
    margin-right: -1px;
  }
  > .v-input__prepend .v-field__outline .v-field__outline__end {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  /* autocomplete */
  > .v-input__control .v-field__outline .v-field__outline__start {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
