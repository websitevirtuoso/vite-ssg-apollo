<template>
  <v-combobox
    v-bind="$attrs" :items="states.data" :label="t('messages.state')"
    item-title="name" item-value="id" multiple chips closable-chips clearable :loading="loading" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useQuery } from "@vue/apollo-composable"
import GetStates from '../graphql/queries/getStates.gql'

const { t } = useI18n()
const { result, loading } = useQuery(GetStates, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
const states = computed(() => result.value?.states ?? { data: [] })
</script>
