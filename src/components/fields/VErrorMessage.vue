<template>
  <ErrorMessage v-slot="{ message }" :name="name">
    <div class="v-input__details">
      <div class="v-messages validation__error">
        <div class="v-messages__message">
          {{ message }}
        </div>
      </div>
    </div>
  </ErrorMessage>
</template>

<script setup lang="ts">
import { ErrorMessage } from 'vee-validate'

defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>
