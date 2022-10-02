<template>
  <listing-default-features-query v-slot="{ items, loading }">
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-card-title>
          {{ t('messages.amenities') }}
        </v-card-title>
        <v-card-text class="py-0">
          <listing-features v-model="valueAmenities" :error-messages="errorsAmenities" :loading="loading" :items="items.amenities" />
        </v-card-text>
      </v-col>
      <v-col cols="12" md="6">
        <v-card-title>
          {{ t('messages.utilities') }}
        </v-card-title>
        <v-card-text class="py-0">
          <listing-features v-model="valueUtilities" :error-messages="errorsUtilities" :loading="loading" :items="items.utilities" />
        </v-card-text>
      </v-col>
      <v-col cols="12">
        <v-card-title>
          {{ t('messages.accessibility') }}
        </v-card-title>
        <v-card-text class="py-0">
          <listing-features
            v-model="valueAccessibility"
            :error-messages="errorsAccessibility"
            :loading="loading"
            :items="items.accessibility"
          />
        </v-card-text>
      </v-col>
    </v-row>
  </listing-default-features-query>
</template>

<script setup lang="ts">
import ListingFeatures from '@/modules/listings/components/listingCreate/Features.vue'
import ListingDefaultFeaturesQuery from '@/modules/listings/components/listing/RenderlessListingFeaturesQuery.vue'

const { value: valueAmenities, errors: errorsAmenities } = useField('amenities')
const { value: valueUtilities, errors: errorsUtilities } = useField('utilities')
const { value: valueAccessibility, errors: errorsAccessibility } = useField('accessibility')

const { t } = useI18n()
</script>
