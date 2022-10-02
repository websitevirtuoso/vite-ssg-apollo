import { Cities, States, ListingTerms, ListingTypes, Roles, Users } from '@/plugins/apollo/schemaTypesGenerated'

export const getUser = () => {
  // @ts-expect-error variable undefined
  return cy.php('App\\Models\\User::first()').then((user: Users) => user)
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
      .then((city: Cities) => city)
  )
}

export const getRole = () => {
  return (
    cy
      .php('App\\Models\\Role::inRandomOrder()->first()')
      // @ts-expect-error variable undefined
      .then((role: Roles) => role)
  )
}

export const getState = () => {
  return (
    cy
      .php("App\\Models\\State::with('country')->inRandomOrder()->first()")
      // @ts-expect-error variable undefined
      .then((state: States) => state)
  )
}

export const getListingTerms = () => {
  return (
    cy
      .php('App\\Models\\ListingTerm::inRandomOrder()->first()')
      // @ts-expect-error variable undefined
      .then((listingTerm: ListingTerms) => listingTerm)
  )
}

export const getListingTypes = () => {
  return (
    cy
      .php('App\\Models\\ListingType::inRandomOrder()->first()')
      // @ts-expect-error variable undefined
      .then((listingType: ListingTypes) => listingType)
  )
}
