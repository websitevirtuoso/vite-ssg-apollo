<template>
  <v-select
    v-bind="$attrs" :items="countries.data" :label="t('messages.country')"
    item-title="name" item-value="id" required
  />
</template>

<script setup lang="ts">
import GetCountries from '../graphql/queries/getCountries.gql'
import { useQuery } from "@vue/apollo-composable"
import { computed } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const { result } = useQuery(GetCountries, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
const countries = computed(() => result.value?.countries ?? { data: [] })
</script>
