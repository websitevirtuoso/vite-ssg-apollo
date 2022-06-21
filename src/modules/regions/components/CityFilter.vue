<template>
  <v-card :title="t('action.filters')" elevation="4" class="mb-4">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <filter-by-multiple v-model="rawFilter.id" type="number" :hint="t('messages.multiple_values')" :label="t('messages.id', 2)" />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text v-model="rawFilter.name" :label="t('messages.name')" />
        </v-col>
        <v-col cols="12" md="3">
          <state-select v-model="rawFilter.state_id" hide-details :return-object="false" />
        </v-col>
        <v-col cols="12" md="3">
          <country-select v-model="rawFilter.country_id" hide-details clearable />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import CountrySelect from "@/modules/regions/components/Country.vue"
import StateSelect from "@/modules/regions/components/State.vue"
import { FilterByText, FilterByMultiple } from "@/components/datatable/index"
import { rawFilter } from "@/composables/useFilter"

const { t } = useI18n()
</script>
