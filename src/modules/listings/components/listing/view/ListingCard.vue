<template>
  <v-card data-test="listing.card">
    <media-slider :media="listing.media" :height="250" :show-arrows="false" hide-delimiters>
      <template #toolbar>
        <v-toolbar color="transparent" density="compact" class="listing-statuses">
          <v-spacer />
          <v-btn v-if="can('upsert', 'listing')" icon>
            <v-icon color="primary" data-test="update" @click="$router.push({ name: 'listing-update', params: { id: listing.id } })">{{
              mdiPencil
            }}</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="blue darken-4" @click="router.push({ name: 'listing-view', params: { id: listing.id } })">{{ mdiEye }}</v-icon>
          </v-btn>
          <v-chip label :class="getStatusColor(listing.status)" small>
            {{ listing.status }}
          </v-chip>
        </v-toolbar>
      </template>
    </media-slider>
    <v-card-actions>
      <div class="v-card-title" style="flex: auto">{{ listing.address }}</div>

      <v-spacer />
      <v-btn size="small" :icon="expand ? mdiChevronUp : mdiChevronDown" @click="expand = !expand" />
    </v-card-actions>
    <v-divider />
    <v-list dense>
      <v-list-item>
        <template #default>
          <v-list-item>
            <v-list-item-title>#{{ listing.id }}</v-list-item-title>
            <v-list-item-subtitle>$ {{ listing.price }}</v-list-item-subtitle>
          </v-list-item>
        </template>
        <template #prepend>
          <v-list-item>
            <v-icon color="indigo">{{ mdiCounter }}</v-icon>
          </v-list-item>
        </template>

        <template #append>
          <v-icon data-test="update" @click="router.push({ name: 'listing-update', params: { id: listing.id } })"> {{ mdiPencil }} </v-icon>
        </template>
      </v-list-item>

      <v-list-item>
        <template #default>
          <v-list-item>
            <v-list-item-title> #{{ listing.user.id }}, {{ listing.user.first_name }} {{ listing.user.last_name }} </v-list-item-title>
            <v-list-item-subtitle>{{ t('messages.user') }}</v-list-item-subtitle>
          </v-list-item>
        </template>
        <template #prepend>
          <v-list-item>
            <v-icon color="indigo">{{ mdiAccount }}</v-icon>
          </v-list-item>
        </template>

        <template #append>
          <v-icon @click="router.push({ name: 'user-update', params: { id: listing.user.id } })">{{ mdiEye }}</v-icon>
        </template>
      </v-list-item>

      <v-list-item>
        <template #default>
          <v-list-item>
            <v-list-item-title>{{ listing.address }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ listing.city.state.country.name }}, {{ listing.city.state.name }}, {{ listing.city.name }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>
        <template #prepend>
          <v-list-item>
            <v-icon color="indigo">{{ mdiMapMarker }}</v-icon>
          </v-list-item>
        </template>
      </v-list-item>
    </v-list>
    <v-expand-transition>
      <div v-show="expand">
        <v-divider />
        <v-list dense>
          <v-list-item>
            <template #default>
              <v-list-item>
                <v-list-item-title>{{ dayjs(listing.updated_at).format('YYYY-MM-DD HH:mm') }}</v-list-item-title>
                <v-list-item-subtitle>{{ t('messages.updated_at') }}</v-list-item-subtitle>
              </v-list-item>
            </template>
            <template #prepend>
              <v-list-item>
                <v-icon color="indigo">{{ mdiTimer }}</v-icon>
              </v-list-item>
            </template>
          </v-list-item>
          <v-list-item>
            <template #default>
              <v-list-item>
                <v-list-item-title>{{ dayjs(listing.created_at).format('YYYY-MM-DD HH:mm') }}</v-list-item-title>
                <v-list-item-subtitle>{{ t('messages.created_at') }}</v-list-item-subtitle>
              </v-list-item>
            </template>
            <template #prepend>
              <div class="full-width-as-icon"></div>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts" setup>
import MediaSlider from './MediaSlider.vue'
import { Listings } from '@/plugins/apollo/schemaTypesGenerated'
import { getStatusColor } from '@/modules/listings/helpers/listing'

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()
const expand = ref(false)

defineProps({
  listing: {
    type: Object as () => Listings,
    required: true,
  },
})
</script>

<style lang="scss">
.full-width-as-icon {
  width: 56px;
}
</style>
