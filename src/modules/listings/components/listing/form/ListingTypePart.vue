<template>
  <listing-types-query v-slot="{ items, loading }">
    <v-radio-group v-model="value" :loading="loading" :error-messages="errors" mandatory data-test="listing.types">
      <v-row no-gutters>
        <v-col v-for="type in items" :key="type.id" cols="12" lg="4" md="6">
          <v-radio :label="type.description" :value="type.id" color="indigo darken-3" data-test="listing.type" />
        </v-col>
      </v-row>
    </v-radio-group>
  </listing-types-query>
</template>

<script setup lang="ts">
import ListingTypesQuery from '@/modules/listings/components/RenderlessListingTypesQuery.vue'

const { value, errors } = useField('type_id')
</script>
