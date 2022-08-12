export interface PromoInput {
  code: string
  discount: string
  use: string
  short_description: string
  description: string
  expire_at: string
  rules: {
    user_use_once: boolean
  }
}
