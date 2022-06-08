<template>
  <v-app-bar :order="preferences.fullSizeBar">
    <v-app-bar-nav-icon data-test="sidenav-toggle" @click="preferences.toggleLeftSideBar()"/>
    <v-btn
      :icon="`mdi-chevron-${preferences.showMiniSideBar ? 'right' : 'left'}`"
      class="hidden-sm-and-down" @click="preferences.toggleMiniSideBar()" />
    <v-btn icon="mdi-arrow-expand-vertical" class="hidden-sm-and-down" @click="preferences.toggleSizeBar()" />
    <v-spacer />
    <!--    <v-tooltip bottom>-->
    <!--      <template #activator="{ on }">-->
    <v-btn icon="mdi-exit-to-app" @click="logout" />
    <!--      </template>-->
    <!--      <span>{{ t('auth.logout') }}</span>-->
    <!--    </v-tooltip>-->
  </v-app-bar>
</template>

<script setup lang="ts">
import { usePreferences } from "@/stores/preferences";
import { onLogoutApollo } from "@/modules/auth/utils/auth";
import { useRouter } from "vue-router";
import { useApolloClient, useMutation } from "@vue/apollo-composable";
import { LogOut } from "@/modules/auth/graphql/mutations/auth.gql";

const preferences = usePreferences();
const router = useRouter();
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
