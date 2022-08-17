<template>
  <v-chip :color="status ? 'green' : 'red'" text-color="white" small>
    <v-avatar left>
      <v-icon>{{ status ? 'mdi-checkbox-marked-circle' : 'mdi-cancel' }}</v-icon>
    </v-avatar>
    {{ status ? t('action.yes') : t('action.no') }}
  </v-chip>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"

const { t } = useI18n()

defineProps({
  status: {
    type: Boolean,
    required: true
  }
})
</script>
