<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.role', 2)">
          <div class="table-toolbar">
            <action-create v-if="can('upsert', 'role')" :to="{ name: 'role-create' }" />
          </div>
          <v-table data-test="datatable">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header.title" class="text-left">{{ header.text }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in roles.data" :key="role.id">
                <td>{{ role.id }}</td>
                <td>{{ role.display_name }}</td>
                <td>{{ role.description }}</td>
                <td>{{ role.name }}</td>
                <td>{{ dayjs(role.created_at).format('YYYY-MM-DD HH:mm') }}</td>
                <td>{{ dayjs(role.updated_at).format('YYYY-MM-DD HH:mm') }}</td>
                <td v-if="can('upsert', 'role')">
                  <action-update :text="t('action.update')" @click="router.push({ name: 'role-update', params: { id: role.id } })" />
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-card-actions>
            <v-spacer />
            <v-btn size="small" color="primary" @click="prev">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn size="small" color="primary" @click="next">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import GetRoles from '../graphql/queries/getRoles.gql'
import pagination from '@/composables/usePagination'
import { ActionCreate, ActionUpdate } from '@/components/datatable/index'

const { t } = useI18n()
const router = useRouter()
const { can } = useAbility()

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.name'), value: 'display_name' },
  { text: t('messages.description'), value: 'description' },
  { text: t('messages.system_name'), value: 'name' },
  { text: t('messages.created_at'), value: 'created_at' },
  { text: t('messages.updated_at'), value: 'updated_at' },
  can('upsert', 'role') ? { text: t('messages.actions'), value: 'action', width: '15px', align: 'right' } : {},
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

const { result } = useQuery(GetRoles, { pagination })
const roles = computed(() => result.value?.roles ?? { data: [] })
</script>
