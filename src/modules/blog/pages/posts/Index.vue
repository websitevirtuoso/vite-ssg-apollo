<template>
  <v-container fluid>
    <v-row>
      <transition name="scroll-y-reverse-transition">
        <v-col v-show="filtersShow" cols="12">
          <post-filter />
        </v-col>
      </transition>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.post', 2)">
          <div class="table-toolbar">
            <action-filter v-model="filtersShow" @click="filtersShow = !filtersShow" />
            <action-create v-if="can('upsert', 'post')" :to="{ name: 'post-create' }" />
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
              <tr v-for="post in posts.data" :key="post.id">
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.slug }}</td>
                <td>
                  <v-chip :color="getStatusColor(post.status)" small>
                    {{ post.status }}
                  </v-chip>
                </td>
                <td>{{ post.category.title }}</td>
                <td>{{ dayjs(post.created_at).format('YYYY-MM-DD HH:mm') }}</td>
                <td>{{ dayjs(post.updated_at).format('YYYY-MM-DD HH:mm') }}</td>
                <td v-if="can('upsert', 'post')">
                  <action-update :text="t('action.update')" @click="router.push({ name: 'post-update', params: { id: post.id } })" />
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
import GetPosts from '../../graphql/queries/getPosts.gql'
import pagination from '@/composables/usePagination'
import { ActionCreate, ActionUpdate, ActionFilter } from '@/components/datatable/index'
import PostFilter from '../../components/PostFilter.vue'
import { filter } from '@/composables/useFilter'

const { can } = useAbility()
const { t } = useI18n()
const router = useRouter()
const filtersShow = ref(false)

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.title'), value: 'title' },
  { text: t('messages.slug'), value: 'slug' },
  { text: t('messages.status'), value: 'status' },
  { text: t('messages.category'), value: 'category' } /* todo make it sortable */,
  { text: t('messages.updated_at'), value: 'updated_at' },
  { text: t('messages.created_at'), value: 'created_at' },
  can('upsert', 'post') ? { text: t('messages.actions'), value: 'action', width: '15px', align: 'right' } : {},
]

const getStatusColor = (statusName: string) => {
  return statusName === 'DISABLED' ? 'red' : 'green'
}

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

const { result } = useQuery(GetPosts, { pagination, filter }, { clientId: 'public', debounce: 700 })
const posts = computed(() => result.value?.posts ?? { data: [] })
</script>
