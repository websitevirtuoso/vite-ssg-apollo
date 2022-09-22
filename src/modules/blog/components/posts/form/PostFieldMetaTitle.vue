<template>
  <v-text-field v-model="value" type="text" :label="t('messages.meta_title')" :error-messages="errors" data-test="post.meta_title" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('meta_title')
</script>
