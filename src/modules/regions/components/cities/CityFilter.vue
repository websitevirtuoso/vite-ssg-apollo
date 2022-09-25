<template>
  <v-card :title="t('action.filters')" class="mb-4">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <filter-by-multiple
            v-model="rawFilter.id"
            type="number"
            :hint="t('messages.multiple_values')"
            :label="t('messages.id', 2)"
            data-test="filter.city.id"
          />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text v-model="rawFilter.name" :label="t('messages.name')" data-test="filter.city.name" />
        </v-col>
        <v-col cols="12" md="3">
          <states-query v-slot="{ items, loading }">
            <v-combobox
              v-model="rawFilter.state_id"
              :items="items"
              :label="t('messages.state')"
              :loading="loading"
              :return-object="false"
              multiple
              chips
              closable-chips
              clearable
              hide-details
              item-title="name"
              item-value="id"
              data-test="filter.city.state"
            />
          </states-query>
        </v-col>
        <v-col cols="12" md="3">
          <countries-query v-slot="{ items, loading }">
            <v-select
              v-model="rawFilter.country_id"
              :items="items"
              :label="t('messages.country')"
              :loading="loading"
              hide-details
              clearable
              item-title="name"
              item-value="id"
              data-test="filter.city.country"
            />
          </countries-query>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import CountriesQuery from '@/modules/regions/components/RenderlessCountriesQuery.vue'
import StatesQuery from '@/modules/regions/components/states/RenderlessStatesQuery.vue'
import { FilterByText, FilterByMultiple } from '@/components/datatable/index'
import { rawFilter } from '@/composables/useFilter'

const { t } = useI18n()
</script>
