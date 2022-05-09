<template>
  <v-navigation-drawer
      id="appDrawer"
      v-model="drawer"
      fixed
      app
      :mini-variant="miniVariant"
      :clipped="clipped"
      width="230"
  >
    <v-app-bar color="primary darken-1" dark>
      <img :src="logo" height="36" alt="">
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">{{ siteName }}</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-list dense expand data-test="left-menu">
      <template v-for="link in menuItems" :key="link.name">
        <!--top-level link-->
        <v-list-item
            :data-test="link.route"
            :to="link.route ? { name: link.route } : null"
        >
          <v-list-item-action v-if="link.icon">
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="link.name" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar :clipped-left="clipped" fixed app>
    <v-app-bar-nav-icon data-test="sidenav-toggle" @click="drawer = !drawer"/>
    <v-btn icon class="hidden-sm-and-down" @click.stop="miniVariant = !miniVariant">
      <v-icon>{{ `mdi-chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <v-btn icon class="hidden-sm-and-down" @click.stop="clipped = !clipped">
      <v-icon>mdi-arrow-expand-vertical</v-icon>
    </v-btn>
    <v-spacer />
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn icon @click.stop="logout">
          <v-icon v-on="on">mdi-exit-to-app</v-icon>
        </v-btn>
      </template>
      <span>{{ t('auth.logout') }}</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from 'vue'
import logo from '@/assets/img/logo.png'

const miniVariant = ref(false)
const clipped = ref(false)
const drawer = ref(false)
const siteName = import.meta.env.VITE_APP_NAME;
const { t } = useI18n()

const menuItems = [
  { route: 'home', name: t('messages.home'), icon: 'mdi-view-dashboard' },
  // { route: 'user', name: t('messages.user'), icon: 'mdi-contacts', permission: 'user.view' },
  // { route: 'property', name: t('messages.property'), permission: 'property.view', icon: 'mdi-home' },
  // { route: 'property-type', name: t('messages.property_type'), permission: 'property_type.view', icon: 'mdi-home-city' },
  // { route: 'role', name: t('messages.role'), icon: 'mdi-eye', permission: 'role.view' },
  // { route: 'permission', name: t('messages.permission'), icon: 'mdi-lock', permission: 'permission.view' },
  // {
  //   name: t('messages.region'),
  //   group: true,
  //   icon: 'mdi-web',
  //   links: [
  //     { route: 'country', name: t('messages.country'), permission: 'country.view' },
  //     { route: 'state', name: t('messages.state'), permission: 'state.view' },
  //     { route: 'city', name: t('messages.city'), permission: 'city.view' },
  //     { route: 'city-alias', name: t('messages.city_alias'), permission: 'city_alias.view' }
  //   ]
  // },
  // {
  //   name: t('messages.content'),
  //   group: true,
  //   icon: 'mdi-folder-multiple-image',
  //   links: [
  //     { route: 'category', name: t('messages.category'), permission: 'category.view', icon: 'mdi-folder-open-outline' },
  //     { route: 'post', name: t('messages.post'), permission: 'post.view', icon: 'mdi-book-open-page-variant' }
  //   ]
  // },
  // { route: 'promo', name: t('messages.promo'), icon: 'mdi-bullhorn', permission: 'promo.view' }
]


const logout = () => {
  console.log('logout')
}
</script>
