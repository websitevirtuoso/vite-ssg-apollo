<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.listing_type', 2)" elevation="4">
          <v-table>
            <thead>
            <tr>
              <th v-for="header in headers" :key="header.title" class="text-left">{{ header.text }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="listing_type in listing_types.data" :key="listing_type.id">
              <td>{{ listing_type.id }}</td>
              <td>{{ listing_type.name }}</td>
              <td>{{ listing_type.description }}</td>
            </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useQuery } from '@vue/apollo-composable'
import { ListingTypesAll } from '../../graphql/queries/listingType.gql'

const { t } = useI18n()

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.name'), value: 'name' },
  { text: t('messages.description'), value: 'description' },
]

const { result } = useQuery(ListingTypesAll, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
const listing_types = computed(() => result.value?.listing_types ?? { data: [] })
</script>
