<template>
  <div data-test="listing.expire_at.block">
    <label for="expire_at" class="form__label">{{ t('messages.expire_at') }}</label>
    <br />
    <!-- todo need to wait v3.1.0 to implement date picker -->
    <input id="expire_at" v-model="value" type="date" :min="dayjs().format('YYYY-MM-DD')" data-test="listing.expire_at" />
    <v-error-message name="expire_at" />
  </div>
</template>

<script setup lang="ts">
import VErrorMessage from '@/components/fields/VErrorMessage.vue'

const { t } = useI18n()
const { value } = useField('expire_at')
</script>
