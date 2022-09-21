<template>
  <v-text-field v-model="value" type="text" :label="t('messages.title')" :error-messages="errors" data-test="post.title" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('title')
</script>
