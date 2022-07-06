import router from '@/plugins/router'

export const redirectNotFoundIfEmpty = (data: object) => {
  if (!data) {
    router.push('/404')
  }
}
