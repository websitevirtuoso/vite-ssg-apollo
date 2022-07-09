<template>
  <v-app-bar :order="preferences.fullSizeBar">
    <v-app-bar-nav-icon data-test="sidenav-toggle" @click="preferences.toggleLeftSideBar()"/>
    <v-btn
      :icon="`mdi-chevron-${preferences.showMiniSideBar ? 'right' : 'left'}`"
      class="hidden-md-and-down" @click="preferences.toggleMiniSideBar()" />
    <v-btn icon="mdi-arrow-expand-vertical" class="hidden-md-and-down" @click="preferences.toggleSizeBar()" />
    <v-spacer />
      <v-tooltip :text="t('auth.logout')" location="bottom">
        <template #activator="{ props }">
          <v-btn icon="mdi-exit-to-app" v-bind="props" data-test="logout" @click="logout"/>
        </template>
      </v-tooltip>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { usePreferences } from "@/stores/preferences"
import { onLogoutApollo } from "@/modules/auth/utils/auth"
import { useApolloClient, useMutation } from "@vue/apollo-composable"
import { gqlHandleError } from "@/helpers/handleErrors"
import LogOut from "@/modules/auth/graphql/mutations/logOut.gql"

const { t } = useI18n()
const router = useRouter()
const preferences = usePreferences()
const defaultApolloClient = useApolloClient('default').client
const { mutate, onError, onDone } = useMutation(LogOut)

onDone(() => {
  onLogoutApollo(defaultApolloClient)
  router.push({ name: 'login' })
})

const logout = () => {
  mutate()

  onError(error => {
    gqlHandleError(error)
  })
}
</script>
