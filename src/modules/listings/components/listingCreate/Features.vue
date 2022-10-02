<template>
  <!-- todo implement colors for chips and helper when nothing selected -->
  <v-combobox
    v-bind="$attrs"
    :label="t('messages.write_own_options')"
    item-title="desc"
    item-value="desc"
    :return-object="false"
    multiple
    chips
    hide-selected
    closable-chips
    clearable
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
