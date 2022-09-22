<template>
  <v-container fluid>
    <v-row>
      <transition name="scroll-y-reverse-transition">
        <v-col v-show="filtersShow" cols="12">
          <city-filter />
        </v-col>
      </transition>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.city', 2)">
          <div class="table-toolbar">
            <action-filter v-model="filtersShow" @click="filtersShow = !filtersShow" />
            <action-create v-if="can('upsert', 'city')" :to="{ name: 'city-create' }" />
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
                <td>
                  <action-update
                    v-if="can('upsert', 'city')"
                    :text="t('action.update')"
                    @click="router.push({ name: 'city-update', params: { id: city.id } })"
                  />
                  <action-view :text="t('action.preview')" @click="showOnMap(city)" />
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-card-actions>
            <v-spacer />
            <v-btn size="small" color="primary" @click="prev">
              <v-icon>{{ mdiChevronLeft }}</v-icon>
            </v-btn>
            <v-btn size="small" color="primary" @click="next">
              <v-icon>{{ mdiChevronRight }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <show-city-on-map
          v-if="Object.keys(selectedCity).length !== 0"
          :name="selectedCity.name"
          :lat="selectedCity.lat"
          :lng="selectedCity.lng"
          :show="show"
          @close="closeOnMap"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// custom
import { filter } from '@/composables/useFilter'
import pagination from '@/composables/usePagination'
import GetCities from '../../graphql/queries/getCities.gql'
import { ActionFilter, ActionCreate, ActionView, ActionUpdate } from '@/components/datatable/index'
import CityFilter from '@/modules/regions/components/CityFilter.vue'
import ShowCityOnMap from '@/modules/regions/components/ShowCityOnMap.vue'
import { City } from '@/modules/regions/types'

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()
const filtersShow = ref(false)
const show = ref(false)

const selectedCity = reactive({}) as City

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.name'), value: 'name' },
  { text: t('messages.lat'), value: 'lat' },
  { text: t('messages.lng'), value: 'lng' },
  { text: t('messages.state'), value: 'state' } /* todo make sortable */,
  { text: t('messages.country'), value: 'country' } /* todo make sortable */,
  can('upsert', 'city') ? { text: t('messages.actions'), value: 'action', width: '15px', align: 'right' } : {},
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}
const showOnMap = (city: City) => {
  show.value = true
  Object.assign(selectedCity, city)
}
const closeOnMap = () => {
  show.value = false
  Object.assign(selectedCity, {})
}

const { result } = useQuery(GetCities, { pagination, filter }, { clientId: 'public', debounce: 700 })
const cities = computed(() => result.value?.cities ?? { data: [] })
</script>
