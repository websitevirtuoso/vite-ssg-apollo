<template>
  <v-card :title="t('action.filters')" class="mb-4">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <filter-by-multiple v-model="rawFilter.id" type="number" :hint="t('messages.multiple_values')" :label="t('messages.id', 2)" />
        </v-col>
        <v-col cols="12" md="6">
          <filter-by-text v-model="rawFilter.name" :label="t('messages.name')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { FilterByText, FilterByMultiple } from "@/components/datatable/index"
import { rawFilter } from "@/composables/useFilter"

const { t } = useI18n()
</script>
