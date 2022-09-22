<template>
  <v-chip :color="status ? 'green' : 'red'" text-color="white" small>
    <v-avatar left>
      <v-icon>{{ status ? mdiCheckboxMarkedCircle : mdiCancel }}</v-icon>
    </v-avatar>
    {{ status ? t('action.yes') : t('action.no') }}
  </v-chip>
</template>

<script setup lang="ts">
const { t } = useI18n()

defineProps({
  status: {
    type: Boolean,
    required: true,
  },
})
</script>
