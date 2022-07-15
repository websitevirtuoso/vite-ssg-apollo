<template>mainPassword!@#$
  <v-select
    v-bind="$attrs" :items="categories.data" :label="t('messages.category')"
    item-title="title" item-value="id" required
  />
</template>

<script setup lang="ts">
import GetCountries from '../graphql/queries/getCategories.gql'
import { useQuery } from "@vue/apollo-composable"
import { computed } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const { result } = useQuery(GetCountries, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
const categories = computed(() => result.value?.categories ?? { data: [] })
</script>
