<template>
  <!-- todo need to work on validation problem -->
  <template v-for="(_, idx) in fields" :key="idx">
    <div class="phone-field">
      <Field v-slot="{ field, errors }" :name="`phone[${idx}]`">
        <v-text-field
          v-bind="field"
          type="number"
          :prepend-icon="mdiPhone"
          hide-details
          :label="t('messages.phone')"
          :error-messages="errors"
          :data-test="`user.phone[${idx}]`"
        />
        <v-btn v-if="idx > 0" :icon="mdiMinusCircle" size="x-small" tile :rounded="0" color="red" class="text-white" @click="remove(idx)" />
      </Field>
    </div>
    <v-error-message :name="`phone['${idx}']`" />
  </template>

  <v-btn
    :icon="mdiPlusCircle"
    size="x-small"
    :rounded="0"
    color="green"
    class="text-white mt-3"
    data-test="user.add-phone"
    tile
    block
    @click="push()"
  />

  <!--  <FieldArray v-slot="{ fields, push, remove }" name="phone">-->
  <!--    <template v-for="(entry, idx) in fields" :key="idx">-->
  <!--      <div class="phone-field">-->
  <!--        <Field v-slot="{ field, errors, value }" :model-value="entry.value" :name="`phone[${idx}]`">-->
  <!--          errors - {{ errors }}-->
  <!--          <v-text-field-->
  <!--            v-bind="field"-->
  <!--            type="text"-->
  <!--            :model-value="value"-->
  <!--            :prepend-icon="mdiPhone"-->
  <!--            hide-details-->
  <!--            :label="t('messages.phone')"-->
  <!--            :error-messages="errors"-->
  <!--            :data-test="`user.phone[${idx}]`"-->
  <!--          />-->
  <!--          <v-btn-->
  <!--            v-if="idx > 0"-->
  <!--            :icon="mdiMinusCircle"-->
  <!--            size="x-small"-->
  <!--            tile-->
  <!--            :rounded="0"-->
  <!--            color="red"-->
  <!--            class="text-white"-->
  <!--            @click="remove(idx)"-->
  <!--          />-->
  <!--        </Field>-->
  <!--      </div>-->
  <!--      <v-error-message :name="`phone[${idx}]`" />-->
  <!--    </template>-->

  <!--    <v-btn-->
  <!--      :icon="mdiPlusCircle"-->
  <!--      size="x-small"-->
  <!--      :rounded="0"-->
  <!--      color="green"-->
  <!--      class="text-white mt-3"-->
  <!--      data-test="user.add-phone"-->
  <!--      tile-->
  <!--      block-->
  <!--      @click="push('')"-->
  <!--    />-->
  <!--  </FieldArray>-->
</template>

<script setup lang="ts">
import VErrorMessage from '@/components/fields/VErrorMessage.vue'
import { Field, useFieldArray } from 'vee-validate'

const { t } = useI18n()
const { remove, push, fields } = useFieldArray('phone')
</script>
