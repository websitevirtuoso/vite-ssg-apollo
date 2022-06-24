<template>
  <v-container fluid>
    <v-row>
      <v-col v-show="filtersShow" cols="12">
        <state-filter />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.state', 2)">
          <div class="table-toolbar">
            <action-filter v-model="filtersShow" @click="filtersShow = !filtersShow"/>
            <action-create v-if="can('upsert' , 'state')" :to="{ name: 'state-create' }"/>
          </div>
          <v-table data-test="datatable">
            <thead>
            <tr>
              <th v-for="header in headers" :key="header.title" class="text-left">{{ header.text }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="state in states.data" :key="state.id">
              <td>{{ state.id }}</td>
              <td>{{ state.code }}</td>
              <td>{{ state.name }}</td>
              <td>{{ state.country.name }}</td>
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
import { computed, ref } from "vue"
import { useAbility } from "@casl/vue"
import { useQuery } from '@vue/apollo-composable'
import { filter } from "@/composables/useFilter"
import pagination from "@/composables/usePagination"
import { StatesAll } from '../../graphql/queries/state.gql'
import { ActionFilter, ActionCreate } from "@/components/datatable/index"
import StateFilter from "@/modules/regions/components/StateFilter.vue"

const { t } = useI18n()
const { can } = useAbility()
const filtersShow = ref(false)

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.code'), value: 'code' },
  { text: t('messages.name'), value: 'name' },
  { text: t('messages.country'), value: 'country' },
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

// todo filters very reactive need to add debounce for filters input
const { result } = useQuery(StatesAll, { pagination, filter }, { clientId: 'public' })
const states = computed(() => result.value?.states ?? { data: [] })
</script>
