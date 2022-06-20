<template>
  <v-container fluid>
    <v-row>
      <v-col v-show="filtersShow" cols="12">
        <v-card :title="t('action.filters')" elevation="4" class="mb-4">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <filter-by-multiple v-model="rawFilter.id" type="number" :hint="t('messages.multiple_values')" :label="t('messages.id', 2)" />
              </v-col>
              <v-col cols="12" md="3">
                <filter-by-text v-model="rawFilter.name" :label="t('messages.name')" />
              </v-col>
              <v-col cols="12" md="3">
                <filter-by-text v-model="rawFilter.code" :label="t('messages.code')" />
              </v-col>
              <v-col cols="12" md="3">
                <country-select v-model="rawFilter.country_id" hide-details clearable />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.state', 2)" elevation="4">
          <div class="table-toolbar">
            <action-filter v-model="filtersShow" @click="filtersShow = !filtersShow"/>
            <action-create v-if="can('upsert' , 'state')" :to="{ name: 'state-create' }"/>
          </div>
          <v-table>
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
import { useQuery } from '@vue/apollo-composable'
import { StatesAll } from '../graphql/queries/state.gql'
import { computed, ref } from "vue"
import pagination from "@/composables/usePagination"
import { rawFilter, filter } from "@/composables/useFilter"
import { ActionFilter, ActionCreate, FilterByText, FilterByMultiple } from "@/components/datatable/index"
import CountrySelect from "@/modules/countries/components/Country.vue"
import { useAbility } from "@casl/vue"

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
