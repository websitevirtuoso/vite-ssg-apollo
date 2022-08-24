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
            data-test="filter.post.id"
          />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text v-model="rawFilter.title" :label="t('messages.title')" data-test="filter.post.title" />
        </v-col>
        <v-col cols="12" md="3">
          <filter-by-text v-model="rawFilter.slug" :label="t('messages.slug')" data-test="filter.post.slug" />
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="rawFilter.status"
            :items="postStatuses"
            :label="t('messages.status')"
            dense
            clearable
            data-test="filter.post.status"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { FilterByText, FilterByMultiple } from '@/components/datatable/index'
import { rawFilter } from '@/composables/useFilter'
import { postStatuses } from '../constants/enums'

const { t } = useI18n()
</script>
