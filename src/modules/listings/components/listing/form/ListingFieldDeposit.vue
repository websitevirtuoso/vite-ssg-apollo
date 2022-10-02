<template>
  <v-text-field
    v-model="value"
    :model-value="value"
    type="number"
    :label="t('messages.deposit')"
    :error-messages="errors"
    :prepend-inner-icon="mdiCashFast"
    data-test="listing.deposit"
    @update:model-value="value = value === '' ? null : value"
  />
</template>

<script setup lang="ts">
/* for optional field had to mutate model when is empty because yup can't handle this */
// details https://github.com/jquense/yup/issues/1650

const { t } = useI18n()
const { value, errors } = useField('deposit')
</script>
