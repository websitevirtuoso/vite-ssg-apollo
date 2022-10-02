<template>
  <v-select
    v-model="value"
    :items="bedroomItems"
    :error-messages="errors"
    :label="t('messages.bedroom', 2)"
    :prepend-inner-icon="mdiBedKingOutline"
    data-test="listing.bedrooms"
  />
</template>

<script setup lang="ts">
import { bedroomItems } from '@/modules/listings/helpers/listing'

const { t } = useI18n()
const { value, errors } = useField('bedrooms')
</script>
