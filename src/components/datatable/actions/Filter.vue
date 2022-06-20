<template>
  <v-btn :icon="modelValue ? 'mdi-close' : 'mdi-filter-variant'" size="small" color="indigo darken-4" />
</template>

<script>
export default {
  name: 'ActionFilter',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  }
}
</script>
