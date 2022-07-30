<template>
  <v-navigation-drawer v-model="showLeftSideBar" :rail="preferences.showMiniSideBar" width="230" data-test="side-bar">
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
      <side-menu :items="allowedMenuItems" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { usePreferences } from "@/stores/preferences"
import { useAbility } from "@casl/vue"
import logo from '@/assets/img/logo.png'
import SideMenu from "./SideMenu.vue"
import { MenuStruct, menuItems } from "@/components/navigation/MenuItems"
import { storeToRefs } from 'pinia'

const siteName = import.meta.env.VITE_APP_NAME;
const preferences = usePreferences()
const { can } = useAbility()

const { showLeftSideBar } = storeToRefs(preferences)

/*
* Exclude all menu items if user doesn't have permission to see them
* */
function flatFilter(arr: MenuStruct[]) {
  return arr.filter(item => {
    let keep = true
    if(item.permission) {
      const [subject, permission] = item.permission.split('.')
      keep = can(permission, subject)
    }
    if (keep && item.children) {
      item.children = flatFilter(item.children);
    }
    return keep;
  });
}

// filter second time to remove group of items if this group doesn't have any items
const allowedMenuItems = flatFilter(menuItems).filter(item => !(item.children && item.children.length === 0))
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
</style>
