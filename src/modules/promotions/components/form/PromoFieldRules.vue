<template>
  {{ t('messages.user_use_once') }}
  <one-time-use
    v-model="value"
    :positive-text="t('action.yes')"
    :negative-text="t('action.no')"
    class="ml-4"
    data-test="promo.rules.user_use_once"
  />
</template>

<script setup lang="ts">
import OneTimeUse from '@/modules/promotions/components/OneTimeUse.vue'

const { t } = useI18n()
const { value } = useField('rules.user_use_once')
</script>
