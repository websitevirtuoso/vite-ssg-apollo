<template>
  <v-tooltip :text="text" location="top">
    <template #activator="{ props: lprops }">
      <v-btn
        v-bind="lprops" icon="mdi-pencil" size="small" flat
        test-attr="update" :text="props.text" class="mr-1" @click="$emit('click')"/>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

defineEmits<{
  (e: 'click'): void
}>()
</script>
