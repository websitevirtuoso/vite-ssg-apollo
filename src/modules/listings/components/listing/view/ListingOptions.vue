<template>
  <v-table>
    <tbody>
      <tr v-for="(pr, i) in listingOptions" :key="i">
        <td>
          <small class="text-uppercase text-muted font-weight-bold">
            {{ pr.text }}
          </small>
        </td>
        <td v-if="pr.value">{{ pr.value }}</td>
        <td v-else>{{ t('messages.na') }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const props = defineProps({
  listing: {
    type: Object,
    required: true,
  },
})

const listingOptions = computed(() => {
  if (!props.listing) return []

  return [
    { value: props.listing.term?.description, text: t('messages.term') },
    { value: props.listing.deposit, text: t('messages.deposit') },
    { value: dayjs(props.listing.created_at).format('YYYY-MM-DD HH:mm:ss'), text: t('messages.created_at') },
    { value: dayjs(props.listing.updated_at).format('YYYY-MM-DD HH:mm:ss'), text: t('messages.updated_at') },
    { value: props.listing.expire_at !== null ? dayjs(props.listing.expire_at).format('YYYY-MM-DD') : null, text: t('messages.expire_at') },
    {
      value: props.listing.available_at !== null ? dayjs(props.listing.available_at).format('YYYY-MM-DD') : null,
      text: t('messages.available_at'),
    },
    { value: props.listing.postal_code, text: t('messages.postcode') },
  ]
})
</script>
