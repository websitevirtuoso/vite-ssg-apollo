import { computed, reactive } from 'vue'

const rawFilter = reactive({})

export const excludeEmptyValues = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      // if empty array exclude it
      if (Array.isArray(v) && v.length === 0) {
        return false
      }
      return v !== null && v !== '' && v !== undefined
    })
  )

  // return Object.entries(obj).reduce((acc, [k, v]) => (v ? { ...acc, [k]: v } : acc), {})
}

const filter = computed(() => {
  // find empty values and remove with keys
  return excludeEmptyValues(rawFilter)
})

export { rawFilter, filter }
