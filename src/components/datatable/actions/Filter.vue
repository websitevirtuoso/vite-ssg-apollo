<template>
  <v-btn v-bind="$attrs" icon :class="modelValue ? 'active' : 'inactive'" data-test="btn.filter" size="small" color="indigo darken-4">
    <v-icon>{{ modelValue ? 'mdi-close' : 'mdi-filter-variant' }}</v-icon>
    <v-tooltip activator="parent" location="bottom" :text="modelValue ? t('action.show-filter') : t('action.hide-filter')" />
  </v-btn>
</template>

<script lang="ts" setup>
const { t } = useI18n()

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
</script>
