<template>
  <wysiwyg
    v-model="value"
    :label="t('messages.content')"
    :error-messages="errors"
    data-test="post.content"
  />
</template>

<script setup lang="ts">
import Wysiwyg from '@/components/fields/Wysiwyg.vue'

const { t } = useI18n()
const { value, errors } = useField('content')
</script>
