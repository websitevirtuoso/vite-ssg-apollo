<template>
  <v-row no-gutters>
    <v-col cols="12" md="6">
      <v-card-title class="pb-0">
        {{ t('messages.amenities') }}
      </v-card-title>
      <v-card-text v-if="amenities.length !== 0">
        <v-chip v-for="item in amenities" :key="item" class="mx-1 mt-1">
          {{ item }}
        </v-chip>
      </v-card-text>
      <v-card-text v-else class="py-0">
        <v-chip small>
          {{ t('messages.na') }}
        </v-chip>
      </v-card-text>
    </v-col>
    <v-col cols="12" md="6">
      <v-card-title class="pb-0">
        {{ t('messages.utilities') }}
      </v-card-title>
      <v-card-text v-if="utilities.length !== 0">
        <v-chip v-for="item in utilities" :key="item" class="mx-1 mt-1">
          {{ item }}
        </v-chip>
      </v-card-text>
      <v-card-text v-else class="py-0">
        <v-chip small>
          {{ t('messages.na') }}
        </v-chip>
      </v-card-text>
    </v-col>
    <v-col cols="12" md="6">
      <v-card-title class="pb-0">
        {{ t('messages.accessibility') }}
      </v-card-title>
      <v-card-text v-if="accessibility.length !== 0">
        <v-chip v-for="item in accessibility" :key="item" class="mx-1 mt-1">
          {{ item }}
        </v-chip>
      </v-card-text>
      <v-card-text v-else class="py-0">
        <v-chip small>
          {{ t('messages.na') }}
        </v-chip>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const { t } = useI18n()

defineProps({
  amenities: {
    type: Array,
    required: true,
    default: () => [],
  },
  utilities: {
    type: Array,
    required: true,
    default: () => [],
  },
  accessibility: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>
