<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.country', 2)">
          <v-table data-test="datatable">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header.title" class="text-left">
                  {{ header.text }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="country in countries.data" :key="country.id">
                <td>{{ country.id }}</td>
                <td>{{ country.code }}</td>
                <td>{{ country.name }}</td>
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
import GetCountries from '../../graphql/queries/getCountries.gql'
import pagination from '@/composables/usePagination'

const { t } = useI18n()

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.code'), value: 'code' },
  { text: t('messages.name'), value: 'name' },
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

const { result } = useQuery(GetCountries, { pagination }, { clientId: 'public' })
const countries = computed(() => result.value?.countries ?? { data: [] })
</script>
