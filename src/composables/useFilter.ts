import { computed, reactive } from 'vue'

const rawFilter = reactive({})

const filter = computed(() => {
  // find empty values and remove with keys
  return Object.fromEntries(Object.entries(rawFilter).filter(([_, v]) => v !== null && v !== ''))
})

export { rawFilter, filter }
