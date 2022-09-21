<template>
  <v-textarea
    v-model="value"
    type="text"
    :label="t('messages.meta_description')"
    :error-messages="errors"
    data-test="post.meta_description"
    filled
    auto-grow
    counter
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('meta_description')
</script>
