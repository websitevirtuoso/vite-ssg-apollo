import router from '@/plugins/router'

export const redirectNotFoundIfEmpty = (data: object): void => {
  if (!data) {
    router.push('/404')
  }
}
