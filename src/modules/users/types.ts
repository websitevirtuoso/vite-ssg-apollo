export interface UserInput {
  id?: string
  first_name: string
  last_name: string
  email: string
  password?: string
  status: string
  phone: string[]
  notify: boolean
  address: string
  postal_code: string
  role_id: number[]
  city_id: number
  state_id: number
  country_id: number
}
