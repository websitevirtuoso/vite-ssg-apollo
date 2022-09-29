import { City } from '@/modules/regions/types'
import { Role } from '@/modules/auth/utils/types'

export const getUser = () => {
  // @ts-expect-error variable undefined
  return cy.php('App\\Models\\User::first()').then((city: City) => city)
}

export const getCity = (selectWhereCityNot?: string) => {
  let whereCountryNot = ''
  if (selectWhereCityNot) {
    whereCountryNot = `->whereHas('state.country', function ($query) { $query->where('name','!=','${selectWhereCityNot}'); })`
  }
  return (
    cy
      .php(`App\\Models\\City::with(['state', 'state.country'])->inRandomOrder()${whereCountryNot}->first()`)
      // @ts-expect-error variable undefined
      .then((city: City) => city)
  )
}

export const getRole = () => {
  return (
    cy
      .php('App\\Models\\Role::inRandomOrder()->first()')
      // @ts-expect-error variable undefined
      .then((role: Role) => role)
  )
}
