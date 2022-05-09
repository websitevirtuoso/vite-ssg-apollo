<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout class="align-center justify-center">
        <div class="mr-3 hidden-sm-and-down">
          <img :src="logo" alt="">
        </div>
        <div class="text-md-center">
          <h1 class="page_error">
            403
          </h1>
          <h3 class="my-3 text-h5">
            {{ t('error.permission_denied') }}
          </h3>
          <h3 class="my-3 text-h6">
            {{ t('error.permission_denied_message') }}
          </h3>
          <div>
            <v-btn color="primary" class="mr-2" @click="$router.push({ name: 'home' }, () => {})">
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
import { useI18n } from 'vue-i18n'
import logo from '../assets/img/error/403.svg'

const { t } = useI18n()
</script>
