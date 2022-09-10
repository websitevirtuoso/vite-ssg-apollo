<template>
  <v-card :title="t('action.filters')" class="mb-4">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <filter-by-multiple
            v-model="rawFilter.id"
            type="number"
            :hint="t('messages.multiple_values')"
            :label="t('messages.id', 2)"
            data-test="filter.promo.id"
          />
        </v-col>
        <v-col cols="12" md="4">
          <filter-by-multiple
            v-model="rawFilter.code"
            type="text"
            :hint="t('messages.multiple_values')"
            :label="t('messages.code', 2)"
            data-test="filter.promo.code"
          />
        </v-col>
        <v-col cols="12" md="4">
          <filter-by-text v-model="rawFilter.discount" type="number" :label="t('messages.discount')" data-test="filter.promo.discount" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
// custom
import { rawFilter } from '@/composables/useFilter'
import { FilterByText, FilterByMultiple } from '@/components/datatable/index'

const { t } = useI18n()
</script>
