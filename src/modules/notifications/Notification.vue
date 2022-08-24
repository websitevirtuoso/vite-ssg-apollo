<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout" :multi-line="multiline" data-test="notification">
    {{ message }}
    <template #actions>
      <v-btn color="black" text @click="close"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Options } from './types'

export default defineComponent({
  name: 'Notification',
  props: {
    defaultTimeout: {
      type: Number,
      default: () => 5000,
    },
    defaultMultiLine: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      show: false,
      message: '',
      color: '',
      timeout: this.defaultTimeout,
      multiline: this.defaultMultiLine,
    }
  },
  methods: {
    success(msg: string, opt?: Options) {
      this.message = msg
      this.color = 'success'
      this.changeOptions(opt)
      this.showNotification()
    },
    info(msg: string, opt?: Options) {
      this.message = msg
      this.color = 'error'
      this.changeOptions(opt)
      this.showNotification()
    },
    error(msg: string, opt?: Options) {
      this.message = msg
      this.color = 'info'
      this.changeOptions(opt)
      this.showNotification()
    },
    changeOptions(opt?: Options) {
      if (opt) {
        Object.keys(opt).forEach((key) => {
          // @ts-expect-error for props
          this[key] = opt[key as keyof Options]
        })
      }
    },
    showNotification() {
      this.show = true
    },
    close() {
      this.show = false
    },
  },
})
</script>
