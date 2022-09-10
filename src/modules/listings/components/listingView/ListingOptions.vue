<template>
  <v-table>
    <tbody>
      <tr v-for="(pr, i) in listingOptions" :key="i">
        <td>
          <small class="text-uppercase text-muted font-weight-bold" style="color: rgba(0, 0, 0, 0.54)">
            {{ pr.text }}
          </small>
        </td>
        <td v-if="pr.value && pr.time === true">
          {{ dayjs(pr.value).format('YYYY-MM-DD HH:mm:ss') }}
        </td>
        <td v-else-if="pr.value">{{ pr.value }}</td>
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
    { value: props.listing.term?.description, time: false, text: t('messages.term') },
    { value: props.listing.deposit, time: false, text: t('messages.deposit') },
    { value: props.listing.created_at, time: true, text: t('messages.created_at') },
    { value: props.listing.updated_at, time: true, text: t('messages.updated_at') },
    { value: props.listing.expire_at, time: true, text: t('messages.expire_at') },
    { value: props.listing.available_at, time: true, text: t('messages.available_at') },
    { value: props.listing.postal_code, time: false, text: t('messages.postcode') },
  ]
})
</script>
