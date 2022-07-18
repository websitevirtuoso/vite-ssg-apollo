import { computed, reactive } from 'vue'

const rawFilter = reactive({})

export const excludeEmptyValues = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      // if empty array exclude it
      if (Array.isArray(v) && v.length === 0) {
        return false
      }
      return v !== null && v !== '' && v !== undefined
    })
  )
}

const filter = computed(() => {
  // find empty values and remove with keys
  return excludeEmptyValues(rawFilter)
})

export { rawFilter, filter }
