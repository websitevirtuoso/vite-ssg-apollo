<template>
  <category-select v-model="value" :error-messages="errors" data-test="post.category" :return-object="false" />
</template>

<script setup lang="ts">
import CategorySelect from '@/modules/blog/components/categories/Categories.vue'
const { value, errors } = useField('category_id')
</script>
