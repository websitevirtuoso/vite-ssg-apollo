<template>
  <v-app id="404">
    <v-container fluid fill-height>
      <v-layout class="align-center justify-center h-screen">
        <div class="mr-3 hidden-sm-and-down">
          <img :src="logo" alt="" />
        </div>
        <div class="text-md-center">
          <h1 class="page_error" data-test="title">404</h1>
          <h3 class="my-3 text-h5" data-test="subtitle">{{ t('error.not_found') }}</h3>
          <h3 class="my-3 text-h6" data-test="description">{{ t('error.not_found_message') }}</h3>
          <div class="d-flex justify-center">
            <v-btn color="primary" class="mr-2" @click="$router.push({ name: 'home' })">
              {{ t('error.return_main') }}
            </v-btn>
            <v-btn color="secondary" @click="$router.go(-1)">
              {{ t('error.return') }}
            </v-btn>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import logo from '@/assets/img/error/404.svg'

const { t } = useI18n()
</script>
