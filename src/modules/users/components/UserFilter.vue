<template>
  <v-card :title="t('action.filters')" class="mb-4">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <filter-by-multiple
            v-model="rawFilter.id" type="number" :hint="t('messages.multiple_values')" :label="t('messages.id', 2)"
            density="compact" data-test="filter.user.id" />
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="rawFilter.status" :items="userStatusesItems" :label="t('messages.status')"
            density="comfortable" clearable data-test="filter.user.status" />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text
            v-model="rawFilter.first_name" :label="t('messages.first_name')"
            density="compact" data-test="filter.user.first_name" />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text
            v-model="rawFilter.last_name" :label="t('messages.last_name')"
            density="compact" data-test="filter.user.last_name" />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text v-model="rawFilter.phone" :label="t('messages.phone')" data-test="filter.user.phone" />
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="rawFilter.notify" :label="t('messages.notify')" clearable data-test="filter.user.notify"
            :items="[{ value: true, title: t('action.yes')}, { value: false, title: t('action.no') }]" />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text v-model="rawFilter.email" :label="t('messages.email')" data-test="filter.user.email" />
        </v-col>
        <v-col cols="12" md="3">
          <roles-query v-slot="{ items, loading }">
            <v-select
              v-model="rawFilter.role_names" :items="items" multiple item-title="display_name" item-value="name"
              :label="t('messages.role', 2)" :loading="loading" clearable data-test="filter.user.roles" />
          </roles-query>
        </v-col>
        <v-col cols="12" md="4">
          <countries-query v-slot="{ items, loading }">
            <v-select
              v-model="rawFilter.country_ids" :items="items" :label="t('messages.country')" :loading="loading"
              multiple hide-details clearable item-title="name" item-value="id" data-test="filter.user.countries"
            />
          </countries-query>
        </v-col>
        <v-col cols="12" md="4">
          <states-query v-if="rawFilter.country_ids.length" v-slot="{ items, loading }" :country_ids="rawFilter.country_ids">
            <v-select
              v-model="rawFilter.state_ids" :items="items" multiple :loading="loading" item-title="name"
              item-value="id" :label="t('messages.state', 2)" clearable data-test="filter.user.states" />
          </states-query>
        </v-col>
        <v-col cols="12" md="4">
          <cities-query v-if="rawFilter.country_ids.length && rawFilter.state_ids.length" v-slot="{ items, loading }" :state_ids="rawFilter.state_ids">
            <v-select
              v-model="rawFilter.city_ids" :items="items" multiple :loading="loading" item-title="name"
              item-value="id" :label="t('messages.city', 2)" clearable data-test="filter.user.cities" />
          </cities-query>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
// libs
import { useI18n } from "vue-i18n"
// custom
import { userStatusesItems } from "../enums"
import { rawFilter } from "@/composables/useFilter"
import { FilterByText, FilterByMultiple } from "@/components/datatable/index"
import RolesQuery from "@/modules/roles/components/RenderlessRolesQuery.vue"
import StatesQuery from "@/modules/regions/components/RenderlessStatesQuery.vue"
import CitiesQuery from "@/modules/regions/components/RenderlessCitiesQuery.vue"
import CountriesQuery from "@/modules/regions/components/RenderlessCountriesQuery.vue"

rawFilter.country_ids = []
rawFilter.state_ids = []
rawFilter.city_ids = []

const { t } = useI18n()
</script>

<style scoped>
.v-row {
  padding: 10px 0;
}
.v-row > div {
  padding: 0 12px;
}
</style>
