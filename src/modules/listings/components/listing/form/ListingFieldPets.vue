<template>
  <v-row no-gutters class="selection-pets">
    <v-col cols="12" md="6" lg="3">
      <v-checkbox
        v-model="value"
        :model-value="value"
        :value="Listing_Pets.NoAllowed"
        :label="t('messages.not_pets_allowed')"
        :error-messages="errors"
        data-test="listing.pets.not-allow"
        @update:model-value="setOptionNotAllow"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-checkbox
        v-model="value"
        :model-value="value"
        :value="Listing_Pets.Cats"
        :label="t('messages.cats_allowed')"
        :error-messages="errors"
        data-test="listing.pets.cats"
        @update:model-value="setOptionAllow"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-checkbox
        v-model="value"
        :model-value="value"
        :value="Listing_Pets.SmallDogs"
        :label="t('messages.small_dogs_allowed')"
        :error-messages="errors"
        data-test="listing.pets.small-dogs"
        @update:model-value="setOptionAllow"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-checkbox
        v-model="value"
        :model-value="value"
        :value="Listing_Pets.LargeDogs"
        :label="t('messages.large_dogs_allowed')"
        :error-messages="errors"
        data-test="listing.pets.large-dogs"
        @update:model-value="setOptionAllow"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Listing_Pets } from '@/plugins/apollo/schemaTypesGenerated'

const { t } = useI18n()
const { value, errors, setValue } = useField('pets')

const setOptionNotAllow = (newVal: Array<string>) => {
  if (newVal.includes(Listing_Pets.NoAllowed)) {
    setValue([Listing_Pets.NoAllowed])
  }
}

const setOptionAllow = (newVal: Array<string>) => {
  const allowedOptions = []
  if (newVal.includes(Listing_Pets.Cats)) {
    allowedOptions.push(Listing_Pets.Cats)
  }
  if (newVal.includes(Listing_Pets.SmallDogs)) {
    allowedOptions.push(Listing_Pets.SmallDogs)
  }
  if (newVal.includes(Listing_Pets.LargeDogs)) {
    allowedOptions.push(Listing_Pets.LargeDogs)
  }
  setValue(allowedOptions)
}
</script>

<style>
.selection-pets .v-selection-control--inline {
  flex: auto;
}
</style>
