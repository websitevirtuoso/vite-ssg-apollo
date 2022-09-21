<template>
  <v-text-field
    v-model="name"
    type="text"
    :label="t('messages.system_name')"
    :error-messages="errors"
    data-test="role.name"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('title')
</script>
