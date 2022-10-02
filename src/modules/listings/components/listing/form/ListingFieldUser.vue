<template>
  <search-user v-model="value" :error-messages="errors" />
</template>

<script setup lang="ts">
import SearchUser from '@/modules/users/components/SearchUser.vue'
const { value, errors } = useField('user')
</script>
