<template>
  <wysiwyg v-model="value" :label="t('messages.description')" :error-messages="errors" data-test="promo.description" />
</template>

<script setup lang="ts">
import Wysiwyg from '@/components/fields/Wysiwyg.vue'
const { t } = useI18n()
const { value, errors } = useField('description')
</script>
