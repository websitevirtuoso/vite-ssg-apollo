<template>
  <v-row>
    <v-col>
      <router-link :to="{ name: 'home' }"> home </router-link> | <router-link :to="{ name: 'countries' }"> country </router-link> |
      <router-link :to="{ name: 'categories' }"> category </router-link>
    </v-col>
  </v-row>
</template>
