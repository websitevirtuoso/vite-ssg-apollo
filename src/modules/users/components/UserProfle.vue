<template>
  <v-card tile style="margin-top: 15%">
    <v-card-actions>
      <v-btn v-if="can('update', 'user')" icon>
        <v-icon color="primary" @click="router.push({ name: 'user-update', params: { id: user.id } })">{{ mdiPencil }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-chip label :color="getStatusColor(user.status)" small>
        {{ user.status }}
      </v-chip>
    </v-card-actions>
    <v-layout class="d-flex justify-center" style="position: initial; margin-top: -120px">
      <v-avatar size="130">
        <v-img :src="noUserProfile" />
      </v-avatar>
    </v-layout>
    <v-card-text class="text-h5 text-center mt-3 py-0"> {{ user.first_name }} {{ user.last_name }} </v-card-text>
    <v-card-text v-if="user.roles.length > 0" class="text-center pt-1 pb-0">
      <v-chip v-for="(role, i) in user.roles" :key="i" size="small" class="bg-grey-darken-3 ma-1" text-color="white">
        {{ role.display_name }}
      </v-chip>
    </v-card-text>
    <v-list dense>
      <v-list-item>
        <template #default>
          <v-list-item>
            <v-list-item-title>#{{ user.id }}</v-list-item-title>
            <v-list-item-subtitle>ID</v-list-item-subtitle>
          </v-list-item>
        </template>
        <template #prepend>
          <v-list-item>
            <v-icon color="indigo">{{ mdiCounter }}</v-icon>
          </v-list-item>
        </template>
      </v-list-item>

      <v-list-item>
        <template #default>
          <v-list-item>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
            <v-list-item-subtitle>{{ t('messages.email') }}</v-list-item-subtitle>
          </v-list-item>
        </template>
        <template #prepend>
          <v-list-item>
            <v-icon color="indigo">{{ mdiEmail }}</v-icon>
          </v-list-item>
        </template>
      </v-list-item>

      <v-list-item>
        <template #default>
          <v-list-item>
            <v-list-item-title> {{ user.city.state.country.name }}, {{ user.city.state.name }}, {{ user.city.name }} </v-list-item-title>
            <v-list-item-subtitle>{{ t('messages.address') }}</v-list-item-subtitle>
          </v-list-item>
        </template>
        <template #prepend>
          <v-list-item>
            <v-icon color="indigo">{{ mdiMapMarker }}</v-icon>
          </v-list-item>
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-card-text>
      <small class="text-uppercase text-muted font-weight-bold d-block">{{ t('messages.phone') }}</small>
      <template v-if="user.phone">
        <v-chip v-for="(phone, i) in user.phone" :key="i" class="ma-1" :text="phone" />
      </template>
      <v-chip v-else :text="t('messages.na')" />
    </v-card-text>
    <v-divider />
    <v-card-text>
      <small class="text-uppercase text-muted font-weight-bold d-block">{{ t('messages.notify') }}</small>
      <v-chip-boolean-status :status="user.notify" />
    </v-card-text>
    <v-divider />
    <v-card-text class="pa-0">
      <v-table>
        <tbody>
          <tr>
            <td>
              <small class="text-uppercase text-muted font-weight-bold">
                {{ t('messages.created_at') }}
              </small>
            </td>
            <td>{{ dayjs(user.created_at).format('YYYY-MM-DD HH:mm') }}</td>
          </tr>
          <tr>
            <td>
              <small class="text-uppercase text-muted font-weight-bold">
                {{ t('messages.updated_at') }}
              </small>
            </td>
            <td>{{ dayjs(user.updated_at).format('YYYY-MM-DD HH:mm') }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { Users } from '@/plugins/apollo/schemaTypesGenerated'
import { getStatusColor } from '@/modules/users/helpers/user'
import VChipBooleanStatus from '../components/VChipBooleanStatus.vue'

defineProps({
  user: {
    type: Object as () => Users,
    required: true,
  },
})

import noUserProfile from '@/assets/img-user.jpg'
const { can } = useAbility()
const { t } = useI18n()
const router = useRouter()
</script>
