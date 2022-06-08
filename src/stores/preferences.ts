import { defineStore } from 'pinia'

export const usePreferences = defineStore('preferences', {
  state: () => ({
    showLeftSideBar: false,
    showMiniSideBar: false,
    fullSizeBar: 0,
  }),
  actions: {
    toggleLeftSideBar() {
      this.showLeftSideBar = !this.showLeftSideBar
    },
    toggleMiniSideBar() {
      this.showMiniSideBar = !this.showMiniSideBar
    },
    toggleSizeBar() {
      if (this.fullSizeBar === 0) {
        this.fullSizeBar = -1
      } else {
        this.fullSizeBar = 0
      }
    },
  },
  persist: true,
})
