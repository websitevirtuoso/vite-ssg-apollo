<template>
  <v-text-field
    v-model="value"
    type="password"
    :prepend-inner-icon="mdiLock"
    :label="t('messages.password')"
    :error-messages="errors"
    autocomplete="new-password"
    data-test="user.password"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('password')
</script>
