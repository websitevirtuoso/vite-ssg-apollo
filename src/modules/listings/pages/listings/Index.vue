<template>
  <v-container fluid class="listings-toolbar pt-0">
    <v-row>
      <v-col cols="12">
        <v-toolbar color="white elevation-4" density="compact">
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-select
            v-model="pagination.sortBy[0]"
            :items="sortBy"
            density="compact"
            hide-details
            variant="outlined"
            prepend-inner-icon="mdi-filter-menu-outline"
            :label="t('action.sort')"
            class="sortBy mr-2"
          />
          <v-tooltip :text="pagination.sortDesc[0] ? t('messages.lowest') : t('messages.highest')" location="bottom">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                tile
                :rounded="0"
                :icon="pagination.sortDesc[0] ? 'mdi-sort-descending' : 'mdi-sort-ascending'"
                color="primary"
                @click="pagination.sortDesc = [!pagination.sortDesc[0]]"
              />
            </template>
          </v-tooltip>
          <v-divider vertical />

          <v-menu transition="slide-y-transition" open-on-hover bottom>
            <template #activator="{ props }">
              <v-btn v-bind="props" color="primary" icon="mdi-information-variant" :rounded="0" tile />
            </template>
            <div class="bg-white pb-2 elevation-3 rounded listing-statuses">
              <div v-for="(status, i) in statusesWithColors" :key="i">
                <v-chip class="mx-2 mt-2" :class="status.bgClass" label>
                  <v-icon left class="pr-2">mdi-label</v-icon>
                  {{ status.status }}
                </v-chip>
                <v-spacer />
              </div>
            </div>
          </v-menu>

          <v-divider vertical />
          <!--          <v-btn-toggle v-model="layoutGrid" borderless style="margin-right: 1px">-->
          <!--            <v-btn :model-value="true" icon="mdi-view-comfy" />-->
          <!--            <v-btn :model-value="false" icon="mdi-view-list" />-->
          <!--          </v-btn-toggle>-->
          <v-divider vertical />
          <v-tooltip :text="filterShow ? t('action.show-filter') : t('action.hide-filter')" location="bottom">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                tile
                :rounded="0"
                :icon="filterShow ? 'mdi-close' : 'mdi-filter-variant'"
                color="indigo darken-4"
                @click="filterShow = !filterShow"
              />
            </template>
          </v-tooltip>
          <v-btn
            v-if="can('create', 'listing')"
            icon="mdi-plus-circle"
            tile
            :rounded="0"
            color="primary"
            @click="router.push({ name: 'listing-create' })"
          />
        </v-toolbar>
      </v-col>
      <v-col>
        <v-row v-if="listings.data.length !== 0">
          <v-col v-for="listing in listings.data" :key="listing.id" cols="12" sm="6" md="4" lg="3">
            <listing-card :listing="listing" />
          </v-col>
        </v-row>
      </v-col>
      <transition name="scroll-x-reverse-transition">
        <v-col v-show="filterShow" cols="12" md="3">
          <listing-filter />
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>
<!-- todo implement v-data-iterator vuetify v3.1.0 -->

<script setup lang="ts">
// libs
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAbility } from '@casl/vue'
import { useRouter } from 'vue-router'

// custom
import { filter } from '@/composables/useFilter'
import { useQuery } from '@vue/apollo-composable'
import ListingFilter from '../../components/ListingFilter.vue'
import ListingCard from '../../components/listingView/ListingCard.vue'
import { statusesWithColors } from '@/modules/listings/helpers/listing'
import GetListings from '@/modules/listings/graphql/queries/getListings.gql'

const { t } = useI18n()
const { can } = useAbility()
const router = useRouter()
const layoutGrid = ref(true)
const filterShow = ref(false)

const pagination = {
  sortDesc: [true],
  page: 1,
  take: 12,
  sortBy: ['id'],
}

const internalPagination = {
  page: 1,
  take: 12,
}

const sortBy = ['id', 'status', 'price', 'bedrooms', 'bathrooms']

const { result } = useQuery(
  GetListings,
  { pagination: internalPagination, filter, mediaOnlyPrimary: true },
  { clientId: 'public', debounce: 700 }
)
const listings = computed(() => result.value?.listings ?? { data: [] })
</script>

<style lang="scss">
.listings-toolbar {
  .v-toolbar,
  .sortBy .v-field {
    overflow: inherit;
  }
}
.listing-statuses {
  .v-chip {
    color: #fff !important;
  }
}
</style>
