<template>
  <v-text-field
    v-model="value"
    type="text"
    :label="t('messages.name')"
    :error-messages="errors"
    data-test="role.display_name"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('display_name')
</script>
