<template>
  <v-container fluid>
    <v-row>
      <v-col v-show="filtersShow" cols="12">
        <city-filter />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.city', 2)">
          <div class="table-toolbar">
            <action-filter v-model="filtersShow" @click="filtersShow = !filtersShow"/>
            <action-create v-if="can('upsert' , 'city')" :to="{ name: 'city-create' }"/>
          </div>
          <v-table data-test="datatable">
            <thead>
            <tr>
              <th v-for="header in headers" :key="header.title" class="text-left">{{ header.text }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="city in cities.data" :key="city.id">
              <td>{{ city.id }}</td>
              <td>{{ city.name }}</td>
              <td>{{ city.lat }}</td>
              <td>{{ city.lng }}</td>
              <td>{{ city.state.name }}</td>
              <td>{{ city.state.country.name }}</td>
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
import GetCities from '../../graphql/queries/get_cities.gql'
import { ActionFilter, ActionCreate } from "@/components/datatable/index"
import CityFilter from "@/modules/regions/components/CityFilter.vue"

const { t } = useI18n()
const { can } = useAbility()
const filtersShow = ref(false)

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.name'), value: 'name' },
  { text: t('messages.lat'), value: 'lat' },
  { text: t('messages.lng'), value: 'lng' },
  { text: t('messages.state'), value: 'state' }, /* todo make sortable */
  { text: t('messages.country'), value: 'country' }, /* todo make sortable */
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

// todo filters very reactive need to add debounce for filters input
const { result } = useQuery(GetCities, { pagination, filter }, { clientId: 'public' })
const cities = computed(() => result.value?.cities ?? { data: [] })
</script>
