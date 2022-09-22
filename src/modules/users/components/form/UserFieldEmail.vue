<template>
  <v-text-field
    v-model="value"
    type="email"
    :prepend-icon="mdiAccount"
    :label="t('messages.email')"
    :error-messages="errors"
    data-test="user.email"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('email')
</script>
