<template>
  <users-query v-slot="{ items, loading }" v-bind="filterUsersBy">
    <v-autocomplete
      v-bind="$attrs"
      :items="items"
      :loading="loading"
      :label="t('messages.user')"
      :item-title="filterByField"
      item-value="id"
      variant="outlined"
      :return-object="true"
      hide-details
      density="compact"
      class="select-group"
      @update:search="onSearch"
      @update:model-value="onSelectedUser"
    >
      <template #prepend>
        <v-select
          v-model="filterByField"
          :items="filterByFields"
          :label="t('action.filter')"
          variant="outlined"
          density="compact"
          hide-details
        />
      </template>
    </v-autocomplete>
  </users-query>

  <v-expand-transition>
    <div v-if="Object.keys(user).length !== 0">
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

const { t } = useI18n()
const user = reactive({}) as Users
const search = ref('')
const filterByField = ref('id')
const filterByFields = ['id', 'first_name', 'last_name', 'email', 'phone']

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
      value: user.id,
    },
    {
      text: t('messages.name'),
      value: `${user.first_name} ${user.last_name}`,
    },
    {
      text: t('messages.email'),
      value: user.email,
    },
    {
      text: t('messages.status'),
      value: user.status,
    },
    {
      text: t('messages.postal_code'),
      value: user.postal_code,
    },
    {
      text: t('messages.location'),
      value: `${user.city?.state.country.name}, ${user.city?.state.name}, ${user?.city?.name}`,
    },
  ]
})

const onSearch = (value: string) => {
  search.value = value
}

const onSelectedUser = (selectedUser: Users) => {
  Object.assign(user, selectedUser)
}
</script>

<style lang="scss">
.select-group {
  .v-input__prepend {
    margin-inline-end: 0;
    --v-input-padding-top: 0;
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
