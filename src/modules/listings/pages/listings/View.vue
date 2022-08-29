<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-toolbar color="white elevation-4" density="compact" class="no-overflow">
          <div class="mb-0 ml-4 text-h6">#{{ listing.id }}</div>
          <v-spacer />

          <div class="table-toolbar">
            <!-- todo need to add confirmation before removing-->
            <action-delete v-if="can('delete', 'listing')" variant="flat" @click="deleteListing" />
            <action-update
              v-if="can('update', 'listing')" :text="t('action.update')"
              @click="router.push({ name: 'listing-update', params: { id: listing.id } })" />
            <action-create v-if="can('create', 'listing')" variant="flat" :to="{ name: 'listing-create' }" />
          </div>
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <media-slider :media="listing.media" :height="400">
            <template #toolbar>
              <v-toolbar color="transparent" density="compact" class="listing-statuses">
                <v-spacer />
                <v-chip label :class="getStatusColor(listing.status)" dark small>
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
            <v-chip
              v-for="(r, i) in roomFields"
              :key="i"
              class="ma-1"
              :class="r.class"
              text-color="white"
            >
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
            <data-feed-table :initiator="listing.initiator"/>
          </v-card-text>
          <v-card-text v-else class="py-2">
            <v-tooltip :text="t('messages.no_auto_generated')" location="top">
              <template #activator="{ props }">
                <v-chip v-bind="props" small :text="t('messages.na')" />
              </template>
            </v-tooltip>
          </v-card-text>
          <!-- todo add user profile information -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// libs
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAbility } from '@casl/vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'

// custom
import MediaSlider from '../../components/listingView/MediaSlider.vue'
import { ActionDelete, ActionCreate } from '@/components/datatable/index'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import GetListing from '../../graphql/queries/getListing.gql'
import DataFeedTable from '../../components/listingView/DetaFeedTable.vue'
import { Listings } from '@/plugins/apollo/schemaTypesGenerated'
import { statusesWithColors } from '@/modules/listings/helpers/listing'
import PetOptions from '@/modules/listings/components/listingView/PetOptions.vue'
import ActionUpdate from '@/modules/listings/components/listingView/ActionUpdate.vue'
import ListingFeatures from '@/modules/listings/components/listingView/ListingFeatures.vue'
import ListingOptions from '@/modules/listings/components/listingView/ListingOptions.vue'

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()
const route = useRoute()
const listing = reactive({}) as Listings
const features = reactive({})

const { onResult } = useQuery(GetListing, { id: [route.params.id] }, { clientId: 'public' })

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.listings.data[0])
  Object.assign(listing, queryResult.data.listings.data[0])
  Object.assign(features, JSON.parse(queryResult.data.listings.data[0].features))
})

const roomFields = computed(() => {
  if (!listing) return []

  return [
    {
      value: listing.bedrooms === 0 ? 'messages.studio' : listing.bedrooms,
      icon: 'mdi-bed-king-outline',
      text: listing.bedrooms !== 0 ? t('messages.bedrooms') : null,
      class: 'bg-indigo'
    },
    { value: listing.bathrooms, icon: 'mdi-shower', text: t('messages.bathrooms'), class: 'bg-indigo' },
    { value: listing.square_feet, icon: 'mdi-ruler-square', text: t('messages.square_feet'), class: 'bg-indigo' },
    { value: listing.type.name, icon: 'mdi-home-city', class: 'float-right bg-grey-darken-3' }
  ]
})

const getStatusColor = (status: string) => {
  const matched = statusesWithColors.find(item => item.status === status)
  if(!matched) {
    throw new Error('Color for listing not found')
  }
  return matched.bgClass
}

const deleteListing = () => {
  console.log('deleteListing')
}
</script>

<style lang="scss">
.listing-statuses {
  .v-chip {
    color: #fff !important;
  }
}
</style>
