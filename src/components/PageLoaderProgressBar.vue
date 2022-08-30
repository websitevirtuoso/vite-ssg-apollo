<template>
  <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary" />
</template>

<script setup lang="ts">
import { useGlobalQueryLoading, useGlobalMutationLoading } from '@vue/apollo-composable'

const loading = useGlobalQueryLoading() || useGlobalMutationLoading()
</script>
