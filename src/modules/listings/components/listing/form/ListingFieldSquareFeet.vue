<template>
  <v-text-field
    v-model="value"
    type="number"
    :label="t('messages.square_feet')"
    :error-messages="errors"
    :prepend-inner-icon="mdiRulerSquare"
    data-test="listing.square_feet"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('square_feet')
</script>
