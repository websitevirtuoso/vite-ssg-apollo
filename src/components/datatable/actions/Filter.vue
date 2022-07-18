<template>
  <v-btn
    :icon="modelValue ? 'mdi-close' : 'mdi-filter-variant'"
    :class="modelValue ? 'active' : 'inactive'"
    data-test="btn.filter"  size="small" color="indigo darken-4" />
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
