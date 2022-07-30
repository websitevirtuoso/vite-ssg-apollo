<template>
  <template v-for="item in items" :key="item.name">
    <!--group with subitems-->
    <v-list-group
      v-if="item.children"
      :prepend-icon="item.icon"
      active-color="active-group-item"
      color="primary"
      :data-test="item.name"
    >
      <!-- title group with arrow -->
      <template #activator="{ props }">
        <v-list-item v-bind="props" :title="item.name" :prepend-icon="item.icon" />
      </template>

      <!-- sub items -->
      <side-menu-item
        v-for="subItem in item.children" :key="subItem.name"
        :item="subItem"
        :prepend-icon="null"
        :append-icon="subItem.icon" />
    </v-list-group>
    <!-- top-level link-->
    <side-menu-item v-else :item="item" />
  </template>
</template>

<script setup lang="ts">
import SideMenuItem from "./SideMenuItem.vue"

defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
