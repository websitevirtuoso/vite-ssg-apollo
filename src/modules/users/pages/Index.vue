<template>
  <v-container fluid>
    <v-row>
      <transition name="scroll-y-reverse-transition">
        <v-col v-show="filtersShow" cols="12">
          <user-filter />
        </v-col>
      </transition>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :title="t('messages.user', 2)">
          <div class="table-toolbar">
            <action-filter v-model="filtersShow" @click="filtersShow = !filtersShow" />
            <action-create v-if="can('create', 'user')" :to="{ name: 'user-create' }" />
          </div>
          <v-table data-test="datatable">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header.text" class="text-left">{{ header.text }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users.data" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <v-chip-boolean-status :status="user.notify" />
                </td>
                <td>
                  <v-chip :color="userStatusColors.find((item) => item.status === user.status).color" dark small>
                    {{ user.status }}
                  </v-chip>
                </td>
                <td>
                  <v-chip v-for="role in user.roles" :key="role.name" color="primary" dark small>
                    {{ role.display_name }}
                  </v-chip>
                </td>
                <td>{{ dayjs(user.created_at).format('YYYY-MM-DD HH:mm') }}</td>
                <td>{{ dayjs(user.updated_at).format('YYYY-MM-DD HH:mm') }}</td>
                <td>
                  <action-update
                    v-if="can('update', 'user')"
                    :text="t('action.update')"
                    @click="router.push({ name: 'user-update', params: { id: user.id } })"
                  />
                  <update-password
                    v-if="can('update_password', 'user')"
                    :text="t('action.edit_password')"
                    @click="router.push({ name: 'user-update-password', params: { id: user.id } })"
                  />
                  <!-- todo add action to impersonate user -->
                </td>
              </tr>
            </tbody>
          </v-table>
          <animated-router-view />
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAbility } from '@casl/vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'

// custom
import GetUsers from '../graphql/queries/getUsers.gql'
import pagination from '@/composables/usePagination'
import UserFilter from '../components/UserFilter.vue'
import { ActionCreate, ActionFilter, ActionUpdate } from '@/components/datatable/index'
import { filter } from '@/composables/useFilter'
import { userStatusColors } from '../enums'
import VChipBooleanStatus from '../components/VChipBooleanStatus.vue'
import UpdatePassword from '@/modules/users/components/UpdatePassword.vue'
import AnimatedRouterView from '@/components/AnimatedRouterView.vue'

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()
const filtersShow = ref(false)

const headers = [
  { text: '#', value: 'id' },
  { text: t('messages.first_name'), value: 'first_name' },
  { text: t('messages.last_name'), value: 'last_name' },
  { text: t('messages.email'), value: 'email' },
  { text: t('messages.notify'), value: 'notify' },
  { text: t('messages.status'), value: 'status' },
  { text: t('messages.role'), value: 'role' },
  { text: t('messages.created_at'), value: 'created_at' },
  { text: t('messages.updated_at'), value: 'updated_at' },
  can('upsert', 'user') ? { text: t('messages.actions'), value: 'action', width: '15px', align: 'right' } : {},
]

// tmp functions
const next = () => {
  pagination.page++
}
const prev = () => {
  pagination.page--
}

const { result } = useQuery(GetUsers, { pagination, filter })
const users = computed(() => result.value?.users ?? { data: [] })
</script>
