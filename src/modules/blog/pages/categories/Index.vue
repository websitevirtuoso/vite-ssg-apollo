<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.category', 2)">
          <div class="table-toolbar">
            <action-create v-if="can('upsert', 'category')" :to="{ name: 'category-create' }" />
          </div>

          <v-table data-test="datatable">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header.title" class="text-left">
                  {{ header.text }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories.data" :key="category.id">
                <td>{{ category.id }}</td>
                <td>{{ category.title }}</td>
                <td>{{ dayjs(category.created_at).format('YYYY-MM-DD HH:mm') }}</td>
                <td>{{ dayjs(category.updated_at).format('YYYY-MM-DD HH:mm') }}</td>
                <td v-if="can('upsert', 'category')">
                  <action-update
                    :text="t('action.update')"
                    @click="router.push({ name: 'category-update', params: { id: category.id } })"
                  />
                </td>
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
import pagination from '@/composables/usePagination'
import { ActionCreate, ActionUpdate } from '@/components/datatable/index'
import GetCategories from '../../graphql/queries/getCategories.gql'

const { can } = useAbility()
const router = useRouter()
const { t } = useI18n()

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.title'), value: 'title' },
  { text: t('messages.updated_at'), value: 'updated_at' },
  { text: t('messages.created_at'), value: 'created_at' },
  can('upsert', 'category') ? { text: t('messages.actions'), value: 'action', width: '15px', align: 'right' } : {},
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

const { result } = useQuery(GetCategories, { pagination }, { clientId: 'public' })
const categories = computed(() => result.value?.categories ?? { data: [] })
</script>
