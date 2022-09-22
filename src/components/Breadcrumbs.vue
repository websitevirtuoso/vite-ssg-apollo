<template>
  <AmBreadcrumbs class="v-breadcrumbs">
    <template #crumb="{ crumb }">
      <router-link
        class="v-breadcrumbs-item v-breadcrumbs-item--link"
        :class="{ 'v-breadcrumbs-item--disabled': crumb.current }"
        :to="crumb.link"
      >
        <v-icon v-if="crumb.link === '/'" class="pr-1">{{ mdiHome }}</v-icon>
        {{ crumb.label }}
      </router-link>
    </template>
  </AmBreadcrumbs>
</template>

<script setup>
import AmBreadcrumbs from 'vue-3-breadcrumbs/dist/esm/AmBreadcrumbs-04351cc9'
</script>

<style lang="sass">
.v-breadcrumbs-item
  transition: color 1s
  &::after
    content: "/"
    margin-left: 8px
  &--link:hover
    text-decoration: none
    color: rgb(var(--v-theme-primary))

.v-breadcrumbs .router-link-exact-active:after
  content: ""
</style>
