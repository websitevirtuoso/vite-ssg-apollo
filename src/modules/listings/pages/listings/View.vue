<template>
  <v-container v-if="listing" fluid class="pt-0">
    <v-row>
      <v-col cols="12">
        <v-toolbar color="white elevation-4" density="compact" class="no-overflow">
          <div class="mb-0 ml-4 text-h6">#{{ listing.id }}</div>
          <v-spacer />

          <div class="table-toolbar">
            <action-delete
              v-if="can('delete', 'listing')"
              :mutation="ListingDelete"
              :ids="[listing.id]"
              variant="flat"
              @on-done.once="listingDeleteOnDone"
            />
            <action-update
              v-if="can('upsert', 'listing')"
              :text="t('action.update')"
              @click="router.push({ name: 'listing-update', params: { id: listing.id } })"
            />
            <action-create v-if="can('upsert', 'listing')" variant="flat" :to="{ name: 'listing-create' }" />
          </div>
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <media-slider :media="listing.media" :height="400">
            <template #toolbar>
              <v-toolbar color="transparent" density="compact" class="listing-statuses">
                <v-spacer />
                <v-chip label :class="getStatusColor(listing.status)" small>
                  {{ listing.status }}
                </v-chip>
              </v-toolbar>
            </template>
          </media-slider>
          <v-card-title class="subheading font-weight-bold d-flex">
            {{ listing.address }}
            <v-spacer />
            $ {{ listing.price }}
          </v-card-title>
          <v-card-subtitle> {{ listing.city.state.country.name }}, {{ listing.city.state.name }}, {{ listing.city.name }} </v-card-subtitle>
          <v-card-text>
            <v-chip v-for="(r, i) in roomFields" :key="i" class="ma-1" :class="r.class" text-color="white">
              <v-avatar left>
                <v-icon color="white">{{ r.icon }}</v-icon>
              </v-avatar>
              {{ r.value }} {{ r.text }}
            </v-chip>
          </v-card-text>

          <v-divider />

          <v-card-title>{{ t('messages.description') }}</v-card-title>
          <v-card-text>
            <div v-html="listing.description" />
          </v-card-text>

          <v-divider />
          <v-card-text class="pa-0">
            <listing-options :listing="listing" />
          </v-card-text>
          <v-divider />
          <g-map-map :center="{ lat: listing.lat, lng: listing.lng }" :zoom="14" style="width: 100%; height: 400px">
            <g-map-marker :position="{ lat: listing.lat, lng: listing.lng }" />
          </g-map-map>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <pet-options :pets="listing.pets" />
          <listing-features :amenities="features.amenities" :utilities="features.utilities" :accessibility="features.accessibility" />

          <v-card-title>Data feed details</v-card-title>
          <v-divider />
          <v-card-text v-if="listing.initiator" class="pa-0">
            <data-feed-table :initiator="listing.initiator" />
          </v-card-text>
          <v-card-text v-else class="py-2">
            <v-tooltip :text="t('messages.no_auto_generated')" location="top">
              <template #activator="{ props }">
                <v-chip v-bind="props" small :text="t('messages.na')" />
              </template>
            </v-tooltip>
          </v-card-text>
        </v-card>
        <v-row no-gutters class="mt-10">
          <v-col cols="12" md="6" offset-md="3">
            <user-profile :user="listing.user" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// custom
import { ActionDelete, ActionCreate } from '@/components/datatable/index'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import GetListing from '../../graphql/queries/getListing.gql'
import ListingDelete from '../../graphql/mutations/listingDelete.gql'
import { getStatusColor } from '@/modules/listings/helpers/listing'
import { Listings } from '@/plugins/apollo/schemaTypesGenerated'
import { useNotification } from '@/modules/notifications/useNotification'

// components
import MediaSlider from '../../components/listing/view/MediaSlider.vue'
import DataFeedTable from '../../components/listing/view/DetaFeedTable.vue'
import PetOptions from '@/modules/listings/components/listing/view/PetOptions.vue'
import ActionUpdate from '@/modules/listings/components/listing/view/ActionUpdate.vue'
import ListingFeatures from '@/modules/listings/components/listing/view/ListingFeatures.vue'
import ListingOptions from '@/modules/listings/components/listing/view/ListingOptions.vue'
import UserProfile from '@/modules/users/components/UserProfle.vue'

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()
const notification = useNotification()
const route = useRoute()
const listing = ref<Listings>()
const features = ref({ amenities: [], utilities: [], accessibility: [] })

const { onResult } = useQuery(GetListing, { id: [route.params.id] }, { clientId: 'public' })

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.listings.data[0])
  listing.value = queryResult.data.listings.data[0]
  features.value = JSON.parse(queryResult.data.listings.data[0].features)
})

const roomFields = computed(() => {
  if (!listing.value) return []

  return [
    {
      value: listing.value?.bedrooms === 0 ? 'messages.studio' : listing.value.bedrooms,
      icon: mdiBedKingOutline,
      text: listing.value?.bedrooms !== 0 ? t('messages.bedroom', 2) : null,
      class: 'bg-indigo',
    },
    { value: listing.value?.bathrooms, icon: mdiShower, text: t('messages.bathroom', 2), class: 'bg-indigo' },
    { value: listing.value?.square_feet, icon: mdiRulerSquare, text: t('messages.square_feet'), class: 'bg-indigo' },
    { value: listing.value?.type.name, icon: mdiHomeCity, class: 'float-right bg-grey-darken-3' },
  ]
})

const listingDeleteOnDone = () => {
  notification.error(t('action.delete_success'))
  router.push({ name: 'listings' })
}
</script>

<style lang="scss">
.listing-statuses {
  .v-chip {
    color: #fff !important;
  }
}
</style>
