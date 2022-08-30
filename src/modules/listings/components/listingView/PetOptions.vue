<template>
  <v-card-title class="pb-0">
    {{ t('messages.features') }}
  </v-card-title>

  <v-card-text class="py-0">
    <v-chip v-if="pets.includes(Listing_Pets.NoAllowed)" class="ma-1" color="red" text-color="white">
      <v-avatar left>
        <v-icon>mdi-paw</v-icon>
      </v-avatar>
      {{ t('messages.pets') }}

      {{ t('messages.not_allowed') }}
    </v-chip>
    <v-chip v-if="pets.includes(Listing_Pets.Cats)" class="ma-1" color="success" text-color="white">
      <v-avatar left>
        <v-icon>mdi-paw</v-icon>
      </v-avatar>
      {{ t('messages.pets') }}

      {{ t('messages.cats_allowed') }}
    </v-chip>
    <v-chip v-if="pets.includes(Listing_Pets.SmallDogs)" class="ma-1" color="success" text-color="white">
      <v-avatar left>
        <v-icon>mdi-dog-side</v-icon>
      </v-avatar>
      {{ t('messages.pets') }}

      {{ t('messages.small_dogs_allowed') }}
    </v-chip>
    <v-chip v-if="pets.includes(Listing_Pets.LargeDogs)" class="ma-1" color="success" text-color="white">
      <v-avatar left>
        <v-icon>mdi-dog-side</v-icon>
      </v-avatar>
      {{ t('messages.pets') }}

      {{ t('messages.large_dogs_allowed') }}
    </v-chip>
  </v-card-text>
</template>

<script lang="ts" setup>
import { Listing_Pets } from '@/plugins/apollo/schemaTypesGenerated'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  pets: {
    type: Array,
    required: true,
  },
})
</script>
