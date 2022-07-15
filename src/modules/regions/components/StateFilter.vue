<template>
  <v-card :title="t('action.filters')" class="mb-4">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <filter-by-multiple
            v-model="rawFilter.id" type="number"
            :hint="t('messages.multiple_values')" :label="t('messages.id', 2)" data-test="filter.state.id" />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text v-model="rawFilter.name" :label="t('messages.name')" data-test="filter.state.name" />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text v-model="rawFilter.code" :label="t('messages.code')" data-test="filter.state.code" />
        </v-col>
        <v-col cols="12" md="3">
          <country-select v-model="rawFilter.country_id" hide-details clearable data-test="filter.state.country" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import CountrySelect from "@/modules/regions/components/Country.vue"
import { FilterByText, FilterByMultiple } from "@/components/datatable/index"
import { rawFilter } from "@/composables/useFilter"

const { t } = useI18n()
</script>
