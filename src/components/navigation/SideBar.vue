<template>
  <v-navigation-drawer :model-value="preferences.showLeftSideBar" :rail="preferences.showMiniSideBar" width="230">
    <template #prepend>
      <header class="brand v-toolbar">
        <div class="v-toolbar__content" style="height: 64px;">
          <img :src="logo" height="36" alt="">
          <div class="ml-0 pl-5">
            <span class="title hidden-sm-and-down text-white">{{ siteName }}</span>
          </div>
        </div>
      </header>
    </template>
    <v-list dense expand data-test="left-menu">
      <template v-for="link in navLinks(menuItems)" :key="link.name">
        <!--group with subitems-->
        <v-list-group
          v-if="link.children && checkPermission(link.children)"
          :prepend-icon="link.icon"
          active-color="active-group-item"
          color="primary"
          :data-test="link.name"
        >
          <!-- title group with arrow -->
          <template #activator="{ props }">
            <v-list-item v-bind="props" :title="link.name" :prepend-icon="link.icon" :value="link.name" />
          </template>

          <!-- sub items -->
          <v-list-item
            v-for="subItem in navLinks(link.children)" :key="subItem.name"
            :to="{ name: subItem.route }"
            :title="subItem.name"
            :value="subItem.name"
            :append-icon="subItem.icon"
            :data-test="subItem.route"
          />
        </v-list-group>
        <!-- top-level link-->
        <v-list-item
          v-else-if="checkPermission(link.children)"
          :prepend-icon="link.icon"
          :data-test="link.route"
          :title="link.name"
          :to="link.route ? { name: link.route } : null"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { usePreferences } from "@/stores/preferences";
import { useI18n } from "vue-i18n";
import { useAbility } from "@casl/vue";
import logo from '@/assets/img/logo.png'

const siteName = import.meta.env.VITE_APP_NAME;
const preferences = usePreferences();
const { t } = useI18n()
const { can } = useAbility();

export interface MenuStruct {
  name: string
  icon: string
  route: string
  permission: string
}

const menuItems = [
  { route: 'home', name: t('messages.home'), icon: 'mdi-view-dashboard', permission: 'user.view' } as MenuStruct,
  { route: 'permissions', name: t('messages.permissions'), icon: 'mdi-lock', permission: 'permission.view' } as MenuStruct,
  {
    name: t('messages.region'),
    icon: 'mdi-web',
    children: [
      { route: 'countries', name: t('messages.countries'), permission: 'country.view', icon: 'mdi-folder-open-outline' },
      // { route: 'states', name: t('messages.state'), permission: 'state.view' },
      // { route: 'cities', name: t('messages.city'), permission: 'city.view' },
      // { route: 'cities-alias', name: t('messages.city_alias'), permission: 'city_alias.view' }
    ] as MenuStruct[]
  },
  {
    name: t('messages.content'),
    icon: 'mdi-folder-multiple-image',
    children: [
      { route: 'categories', name: t('messages.categories'), permission: 'category.view', icon: 'mdi-folder-open-outline' },
      // { route: 'post', name: t('messages.post'), permission: 'post.view', icon: 'mdi-book-open-page-variant' }
    ]  as MenuStruct[]
  },
]

const navLinks = (arr: MenuStruct[]) => {
  return arr.filter(link => {
    if (link.permission) {
      const [subject, permission] = link.permission.split('.')
      return can(permission, subject)
    }
    return true
  })
}

const checkPermission = (links: MenuStruct[]) => {
  if (Array.isArray(links)) {
    return links.filter(v => {
      const [subject, permission] = v.permission.split('.')
      return can(permission, subject)
    }).length > 0
  }
  return true
}
</script>

<style lang="sass">
.brand
  background-color: rgb(var(--v-theme-primary))
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)
  z-index: 1004
  .title
    font-size: 1.25rem
    line-height: 1.5
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

.text-active-group-item
  background-color:  rgb(var(--v-theme-primary))
  color: #fff

</style>
