<template>
  <v-text-field
    v-model="value"
    type="text"
    :label="t('messages.meta_keyword')"
    :error-messages="errors"
    data-test="post.meta_keyword"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('meta_keyword')
</script>
