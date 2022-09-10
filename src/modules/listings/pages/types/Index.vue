<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.listing_type', 2)">
          <v-table data-test="datatable">
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
                <td v-if="can('update', 'listing_type')">
                  <action-update
                    :text="t('action.update')"
                    @click="router.push({ name: 'listing-type-update', params: { id: listing_type.id } })"
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
import GetListingTypes from '../../graphql/queries/getListingTypes.gql'
import { ActionUpdate } from '@/components/datatable/index'

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.name'), value: 'name' },
  { text: t('messages.description'), value: 'description' },
  can('update', 'listing_type') ? { text: t('messages.actions'), value: 'action', sortable: false, align: 'right' } : {},
]

const { result } = useQuery(GetListingTypes, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
const listing_types = computed(() => result.value?.listing_types ?? { data: [] })
</script>
