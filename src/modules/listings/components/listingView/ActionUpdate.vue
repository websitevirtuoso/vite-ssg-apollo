<template>
  <v-btn
    v-bind="$attrs"
    size="small"
    variant="flat"
    color="green"
    data-test="update"
    class="mr-1"
    icon
    flat
  >
    <v-icon icon="mdi-pencil" color="white" />
    <v-tooltip activator="parent" location="top">
      {{ text }}
    </v-tooltip>
  </v-btn>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>
