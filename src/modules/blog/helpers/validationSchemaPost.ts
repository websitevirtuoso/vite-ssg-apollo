import { object, string } from 'yup'
import { tDefinition } from '@/types/i18n'

export default (t: tDefinition) => {
  return object({
    title: string().required().label(t('messages.title')),
    slug: string().required().label(t('messages.slug')),
    status: string().required().label(t('messages.status')),
    category_id: string().required().label(t('messages.category')),
    content: string().required().min(20).label(t('messages.content')),
    // optional fields
    meta_title: string().label(t('messages.meta_title')),
    meta_keyword: string().label(t('messages.meta_keyword')),
    meta_description: string().label(t('messages.meta_description')),
  })
}
