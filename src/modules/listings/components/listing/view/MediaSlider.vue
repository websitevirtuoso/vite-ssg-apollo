<template>
  <v-carousel v-if="media.length > 0" :cycle="false" :height="height" v-bind="$attrs">
    <v-carousel-item v-for="(img, index) in media" :key="index">
      <v-sheet height="100%" tile color="grey-darken-3">
        <v-row class="fill-height" align="center" justify="center">
          <v-img :height="height" :src="getAbsolutePath(img.path)" :lazy-src="getAbsolutePath(img.path)" contain>
            <v-card-title class="mr-2">
              <slot name="toolbar" />
            </v-card-title>
          </v-img>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  <v-img v-else :height="height" :src="fallbackMedia" :lazy-src="fallbackMedia" cover>
    <v-card-title>
      <slot name="toolbar" />
    </v-card-title>
  </v-img>
</template>

<script lang="ts" setup>
import { getAbsolutePath } from '@/modules/listings/helpers/listing'
import fallbackMedia from '@/assets/img/no-image.svg'

defineProps({
  media: {
    type: Array,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
})
</script>
