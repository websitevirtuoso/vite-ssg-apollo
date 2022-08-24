<script lang="ts" setup>
// define global usage useHead for every route based on route.name
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const formatTitle = (name: string) => {
  // do 1 letter uppercase
  return (name.charAt(0).toUpperCase() + name.slice(1)).replace('-', ' ').replace('_', ' ')
}

const currentRouteName = computed(() => (route.name !== undefined ? formatTitle(String(route.name)) : t('messages.dashboard')))

useHead({
  title: currentRouteName,
})
// end block
</script>

<template>
  <slot />
</template>
