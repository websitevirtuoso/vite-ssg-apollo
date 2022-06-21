<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.listing_term', 2)" elevation="4">
          <v-table>
            <thead>
            <tr>
              <th v-for="header in headers" :key="header.title" class="text-left">{{ header.text }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="listing_term in listing_terms.data" :key="listing_term.id">
              <td>{{ listing_term.id }}</td>
              <td>{{ listing_term.name }}</td>
              <td>{{ listing_term.description }}</td>
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
import { ListingTermsAll } from '../../graphql/queries/listingTerm.gql'

const { t } = useI18n()

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.name'), value: 'name' },
  { text: t('messages.description'), value: 'description' },
]

const { result } = useQuery(ListingTermsAll, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
const listing_terms = computed(() => result.value?.listing_terms ?? { data: [] })
</script>
