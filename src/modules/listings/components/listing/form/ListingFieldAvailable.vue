<template>
  <div data-test="listing.available_at.block">
    <label for="available_at" class="form__label">{{ t('messages.available_at') }}</label>
    <br />
    <!-- todo need to wait v3.1.0 to implement date picker -->
    <input
      id="available_at"
      v-model="value"
      type="date"
      :min="dayjs().format('YYYY-MM-DD')"
      data-test="listing.available_at"
      @update:model-value="value = value === '' ? null : value"
    />
    <v-error-message name="available_at" />
  </div>
</template>

<script setup lang="ts">
import VErrorMessage from '@/components/fields/VErrorMessage.vue'
/* for optional field had to mutate model when is empty because yup can't handle this */
// details https://github.com/jquense/yup/issues/1650

const { t } = useI18n()
const { value } = useField('available_at')
</script>
