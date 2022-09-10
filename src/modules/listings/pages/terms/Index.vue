<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.listing_term', 2)">
          <v-table data-test="datatable">
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
                <td v-if="can('update', 'listing_term')">
                  <action-update
                    :text="t('action.update')"
                    @click="router.push({ name: 'listing-term-update', params: { id: listing_term.id } })"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import GetListingTerms from '../../graphql/queries/getListingTerms.gql'
import { ActionUpdate } from '@/components/datatable/index'

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.name'), value: 'name' },
  { text: t('messages.description'), value: 'description' },
  can('update', 'listing_term') ? { text: t('messages.actions'), value: 'action', sortable: false, align: 'right' } : {},
]

const { result } = useQuery(GetListingTerms, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
const listing_terms = computed(() => result.value?.listing_terms ?? { data: [] })
</script>
