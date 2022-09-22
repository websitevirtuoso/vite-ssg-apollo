<template>
  <roles-query v-slot="{ items, loading }">
    <v-select
      v-model="value"
      :items="items"
      :loading="loading"
      :label="t('messages.role')"
      :error-messages="errors"
      :prepend-icon="mdiAccountGroup"
      item-title="display_name"
      item-value="id"
      :return-object="false"
      multiple
      clearable
      data-test="user.role"
    />
  </roles-query>
</template>

<script setup lang="ts">
import RolesQuery from '@/modules/roles/components/RenderlessRolesQuery.vue'
const { t } = useI18n()
const { value, errors } = useField('role_id')
</script>
