<template>
  <v-container fluid>
    <v-row>
      <v-col v-show="filtersShow" cols="12">
        <promo-filter />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.promo', 2)">
          <div class="table-toolbar">
            <action-filter v-model="filtersShow" @click="filtersShow = !filtersShow"/>
            <action-create v-if="can('upsert' , 'promo')" :to="{ name: 'promo-create' }"/>
          </div>
          <v-table data-test="datatable">
            <thead>
            <tr>
              <th v-for="header in headers" :key="header.text" class="text-left">{{ header.text }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="promo in promotions.data" :key="promo.id">
              <td>{{ promo.id }}</td>
              <td>{{ promo.code }}</td>
              <td>{{ promo.discount }}</td>
              <td>{{ promo.use }}</td>
              <td>{{ promo.short_description }}</td>
              <td>
                <v-chip :color="promo.rules.user_use_once ? 'red' : 'green'" text-color="white" small>
                  <v-avatar left>
                    <v-icon>{{ promo.rules.user_use_once ? 'mdi-cancel' : 'mdi-checkbox-marked-circle' }}</v-icon>
                  </v-avatar>
                  User use once - {{ promo.rules.user_use_once ? t('action.yes') : t('action.no') }}
                </v-chip>
              </td>
              <td>{{ dayjs(promo.created_at).format('YYYY-MM-DD') }}</td>
              <td>
                <v-chip :color="dayjs().format('YYYY-MM-DD') >= promo.expire_at ? 'red' : 'green'" dark small>
                  {{ dayjs(promo.expire_at).format('YYYY-MM-DD') }}
                </v-chip>
              </td>
              <!-- todo add ability to show description
              <template #expanded-item="{ item }">
                <td
                  :colspan="headers.length"
                  v-html="item.description"
                />
              </template> -->
              <td v-if="can('upsert', 'promo')">
                <action-update :text="t('action.update')" @click="router.push({ name: 'promo-update', params: { id: promo.id }})" />
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
// libs
import dayjs from 'dayjs'
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useAbility } from "@casl/vue"
import { useRouter } from "vue-router"
import { useQuery } from '@vue/apollo-composable'

// custom
import { filter } from "@/composables/useFilter"
import pagination from "@/composables/usePagination"
import GetPromotions from '../graphql/queries/getPromotions.gql'
import PromoFilter from "@/modules/promotions/components/PromoFilter.vue"
import { ActionCreate, ActionFilter, ActionUpdate } from "@/components/datatable/index"

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()
const filtersShow = ref(false)

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.code'), value: 'code' },
  { text: t('messages.discount'), value: 'discount' },
  { text: t('messages.use'), value: 'use' },
  { text: t('messages.short_description'), value: 'short_description', sortable: false },
  { text: t('messages.rules'), value: 'rules', sortable: false },
  { text: t('messages.created_at'), value: 'created_at' },
  { text: t('messages.expire_at'), value: 'expire_at' }, // todo  width: '50px'
  can('upsert', 'promo') ? { text: t('messages.actions'), value: 'action', width: '15px', align: 'right' } : {}
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

const { result } = useQuery(GetPromotions, { pagination, filter })
const promotions = computed(() => result.value?.promotions ?? { data: [] })
</script>
