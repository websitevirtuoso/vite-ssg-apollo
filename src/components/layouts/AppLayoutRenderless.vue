<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import AppLayoutDefault from './Auth.vue'
import { shallowRef, watch, markRaw } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const layout = shallowRef({})

watch(
    () => route.meta.layout as string,
    async layoutName => {
      try {
        const component = layoutName && await import(/* @vite-ignore */ `/src/components/layouts/${layoutName}.vue`)
        layout.value = component.default
      } catch (e) {
        layout.value = markRaw(AppLayoutDefault)
      }
    },{ immediate: true }
)
</script>
