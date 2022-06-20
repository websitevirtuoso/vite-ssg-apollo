<template>
  <v-container fluid>
    <v-row>
      <v-col v-show="filtersShow" cols="12">
        <v-card :title="t('action.filters')" elevation="4" class="mb-4">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <filter-by-text v-model="filter.display_name" :label="t('messages.name')" />
              </v-col>
              <v-col cols="12" md="4">
                <filter-by-text v-model="filter.name" :label="t('messages.system_name')" />
              </v-col>
              <v-col cols="12" md="4">
                <filter-by-text v-model="filter.description" :label="t('messages.description')" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.permissions')" elevation="4">
          <div class="table-toolbar">
            <action-filter v-model="filtersShow" @click="filtersShow = !filtersShow"/>
          </div>
          <v-table>
            <thead>
            <tr>
              <th v-for="header in headers" :key="header.title" class="text-left">{{ header.text }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="permission in permissions.data" :key="permission.id">
              <td>{{ permission.id }}</td>
              <td>{{ permission.display_name }}</td>
              <td>{{ permission.description }}</td>
              <td>{{ permission.name }}</td>
              <td>{{ dayjs(permission.created_at).format('YYYY-MM-DD HH:mm') }}</td>
              <td>{{ dayjs(permission.updated_at).format('YYYY-MM-DD HH:mm') }}</td>
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
import { useI18n } from "vue-i18n"
import { useQuery } from '@vue/apollo-composable'
import { PermissionsAll } from '../graphql/queries/permission.gql'
import { computed, ref } from "vue"
import pagination from "@/composables/usePagination"
import dayjs from 'dayjs'
import { ActionFilter, FilterByText } from "@/components/datatable/index"

const { t } = useI18n()
const filtersShow = ref(false)
const filter = ref({})

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.name'), value: 'display_name' },
  { text: t('messages.description'), value: 'description' },
  { text: t('messages.system_name'), value: 'name' },
  { text: t('messages.created_at'), value: 'created_at' },
  { text: t('messages.updated_at'), value: 'updated_at' },
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

// todo filters very reactive need to add debounce for filters input
const { result } = useQuery(PermissionsAll, { pagination, filter })
const permissions = computed(() => result.value?.permissions ?? { data: [] })
</script>
