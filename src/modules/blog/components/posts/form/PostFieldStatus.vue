<template>
  <v-select
    v-model="value"
    :model-value="value"
    :items="Object.values(Post_Status)"
    :label="t('messages.status')"
    :error-messages="errors"
    data-test="post.status"
  />
</template>

<script setup lang="ts">
import { Post_Status } from '@/plugins/apollo/schemaTypesGenerated'

const { t } = useI18n()
const { value, errors } = useField('status')
</script>
