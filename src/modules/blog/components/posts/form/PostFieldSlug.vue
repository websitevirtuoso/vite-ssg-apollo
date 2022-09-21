<template>
  <v-text-field
    v-model="value"
    type="text"
    :label="t('messages.slug')"
    :hint="t('messages.cant_be_change_later')"
    :error-messages="errors"
    data-test="post.slug"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('slug')
</script>
