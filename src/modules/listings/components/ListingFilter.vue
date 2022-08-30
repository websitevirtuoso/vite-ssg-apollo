<template>
  <v-card :title="t('action.filters')" class="mb-4">
    <v-card-text>
      <filter-by-multiple
        v-model="rawFilter.id"
        type="number"
        :hint="t('messages.multiple_values')"
        :label="t('messages.id', 2)"
        density="compact"
        data-test="filter.listing.id"
      />
      <v-select
        v-model="rawFilter.status"
        :items="Object.values(Listing_Status)"
        :label="t('messages.status')"
        density="comfortable"
        clearable
        chips
        multiple
        data-test="filter.listing.status"
      />
      <v-select
        v-model="rawFilter.bedrooms"
        :items="bedroomItems"
        :label="t('messages.bedroom', 2)"
        density="comfortable"
        clearable
        chips
        multiple
        data-test="filter.listing.bedrooms"
      />
      <v-select
        v-model="rawFilter.bathrooms"
        :items="bathroomItems"
        :label="t('messages.bathroom', 2)"
        density="comfortable"
        clearable
        chips
        multiple
        data-test="filter.listing.bathrooms"
      />
      <v-select
        v-model="rawFilter.pets"
        :items="petItems"
        :label="t('messages.pets')"
        density="comfortable"
        clearable
        chips
        multiple
        data-test="filter.listing.pets"
      />
      <v-select
        v-model="rawFilter.media"
        :items="[
          { value: true, title: t('messages.with_media') },
          { value: false, title: t('messages.without_media') },
        ]"
        :label="t('messages.media')"
        density="comfortable"
        clearable
        data-test="filter.listing.media"
      />
      <listing-types-query v-slot="{ items, loading }">
        <v-select
          v-model="rawFilter.type_ids"
          :items="items"
          :loading="loading"
          :label="t('messages.listing_type', 2)"
          item-title="description"
          item-value="id"
          density="comfortable"
          clearable
          chips
          multiple
          data-test="filter.listing.types"
        />
      </listing-types-query>
      <listing-terms-query v-slot="{ items, loading }">
        <v-select
          v-model="rawFilter.term_ids"
          :items="items"
          :loading="loading"
          :label="t('messages.listing_term', 2)"
          item-title="description"
          item-value="id"
          density="comfortable"
          clearable
          chips
          multiple
          data-test="filter.listing.terms"
        />
      </listing-terms-query>
      <filter-by-text
        v-model="rawFilter.postal_code"
        :label="t('messages.postcode')"
        density="compact"
        data-test="filter.listing.postal_code"
      />
      <filter-by-text v-model="rawFilter.address" :label="t('messages.address')" density="compact" data-test="filter.listing.address" />
      <countries-query v-slot="{ items, loading }">
        <v-select
          v-model="rawFilter.country_ids"
          :items="items"
          :label="t('messages.country')"
          :loading="loading"
          multiple
          chips
          clearable
          item-title="name"
          item-value="id"
          data-test="filter.user.countries"
        />
      </countries-query>
      <states-query v-if="rawFilter.country_ids.length" v-slot="{ items, loading }" :country_ids="rawFilter.country_ids">
        <v-select
          v-model="rawFilter.state_ids"
          :items="items"
          multiple
          chips
          :loading="loading"
          item-title="name"
          item-value="id"
          :label="t('messages.state', 2)"
          clearable
          data-test="filter.user.states"
        />
      </states-query>
      <cities-query
        v-if="rawFilter.country_ids.length && rawFilter.state_ids.length"
        v-slot="{ items, loading }"
        :state_ids="rawFilter.state_ids"
      >
        <v-select
          v-model="rawFilter.city_ids"
          :items="items"
          multiple
          chips
          :loading="loading"
          item-title="name"
          item-value="id"
          :label="t('messages.city', 2)"
          clearable
          data-test="filter.user.cities"
        />
      </cities-query>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
// libs
import { useI18n } from 'vue-i18n'
// custom
import { rawFilter } from '@/composables/useFilter'
import { FilterByText, FilterByMultiple } from '@/components/datatable/index'
import StatesQuery from '@/modules/regions/components/RenderlessStatesQuery.vue'
import CitiesQuery from '@/modules/regions/components/RenderlessCitiesQuery.vue'
import CountriesQuery from '@/modules/regions/components/RenderlessCountriesQuery.vue'
import ListingTermsQuery from '@/modules/listings/components/RenderlessListingTermsQuery.vue'
import ListingTypesQuery from '@/modules/listings/components/RenderlessListingTypesQuery.vue'
import { Listing_Status } from '@/plugins/apollo/schemaTypesGenerated'
import { bedroomItems, bathroomItems, petItems } from '@/modules/listings/helpers/listing'

rawFilter.country_ids = []
rawFilter.state_ids = []
rawFilter.city_ids = []

const { t } = useI18n()
</script>
