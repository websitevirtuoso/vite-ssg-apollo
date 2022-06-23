<template>
  <v-app-bar :order="preferences.fullSizeBar">
    <v-app-bar-nav-icon data-test="sidenav-toggle" @click="preferences.toggleLeftSideBar()"/>
    <v-btn
      :icon="`mdi-chevron-${preferences.showMiniSideBar ? 'right' : 'left'}`"
      class="hidden-sm-and-down" @click="preferences.toggleMiniSideBar()" />
    <v-btn icon="mdi-arrow-expand-vertical" class="hidden-sm-and-down" @click="preferences.toggleSizeBar()" />
    <v-spacer />
      <v-tooltip :text="t('auth.logout')" location="bottom">
        <template #activator="{ props }">
          <v-btn icon="mdi-exit-to-app" v-bind="props" data-test="logout" @click="logout"/>
        </template>
      </v-tooltip>
  </v-app-bar>
</template>

<script setup lang="ts">
import { usePreferences } from "@/stores/preferences";
import { onLogoutApollo } from "@/modules/auth/utils/auth";
import { useRouter } from "vue-router";
import { useApolloClient, useMutation } from "@vue/apollo-composable";
import { LogOut } from "@/modules/auth/graphql/mutations/auth.gql";
import { useI18n } from "vue-i18n";

const preferences = usePreferences();
const router = useRouter();
const { t } = useI18n()
const { mutate, onError } = useMutation(LogOut)
const defaultApolloClient = useApolloClient('default').client

const logout = () => {
  mutate()
    .then(() => {
      onLogoutApollo(defaultApolloClient)
      router.push({ name: 'login' })
    })

  // todo duplicated fragment need to add error handler
  onError(error => {
    console.log(error)
  })
}
</script>
