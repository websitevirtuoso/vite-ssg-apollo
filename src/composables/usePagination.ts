import { reactive } from 'vue'

export default reactive({
  take: parseInt(import.meta.env.VITE_DATATABLE_ITEMS),
  page: 1,
})
