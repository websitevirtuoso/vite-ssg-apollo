<template>
  <v-container fluid>
    <v-row>
      <transition name="scroll-y-reverse-transition">
        <v-col v-show="filtersShow" cols="12">
          <city-alias-filter />
        </v-col>
      </transition>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.city_alias', 2)">
          <div class="table-toolbar">
            <action-filter v-model="filtersShow" @click="filtersShow = !filtersShow" />
            <action-create v-if="can('upsert', 'city_alias')" :to="{ name: 'city-alias-create' }" />
          </div>
          <v-table data-test="datatable">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header.title" class="text-left">{{ header.text }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="city_alias in city_aliases.data" :key="city_alias.id">
                <td>{{ city_alias.id }}</td>
                <td>{{ city_alias.name }}</td>
                <td>{{ city_alias.city.name }}</td>
                <td>{{ city_alias.city.state.name }}</td>
                <td>{{ city_alias.city.state.country.name }}</td>
                <td v-if="can('upsert', 'city_alias')">
                  <action-update
                    :text="t('action.update')"
                    @click="router.push({ name: 'city-alias-update', params: { id: city_alias.id } })"
                  />
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { filter } from '@/composables/useFilter'
import pagination from '@/composables/usePagination'
import GetCityAliases from '../../graphql/queries/getCityAliases.gql'
import { ActionFilter, ActionCreate, ActionUpdate } from '@/components/datatable/index'
import CityAliasFilter from '@/modules/regions/components/citiesAlias/CityAliasFilter.vue'

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()
const filtersShow = ref(false)

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.name'), value: 'name' },
  { text: t('messages.city'), value: 'city' },
  { text: t('messages.state'), value: 'state' } /* todo make sortable */,
  { text: t('messages.country'), value: 'country' } /* todo make sortable */,
  can('upsert', 'city_alias') ? { text: t('messages.actions'), value: 'action', width: '15px', align: 'right' } : {},
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

const { result } = useQuery(GetCityAliases, { pagination, filter }, { clientId: 'public', debounce: 700 })
const city_aliases = computed(() => result.value?.city_aliases ?? { data: [] })
</script>
