<template>
  <v-table>
    <tbody>
      <tr>
        <td>{{ t('messages.id') }}</td>
        <td>{{ initiator.id }}</td>
      </tr>
      <tr>
        <td>{{ t('messages.feed') }}</td>
        <td>{{ initiator.name }}</td>
      </tr>
      <tr>
        <td>{{ t('messages.url') }}</td>
        <td>{{ initiator.url ?? t('messages.na') }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { ListingInitiator } from '@/plugins/apollo/schemaTypesGenerated'

const { t } = useI18n()

defineProps({
  initiator: {
    type: Object as () => ListingInitiator,
    required: true,
  },
})
</script>
