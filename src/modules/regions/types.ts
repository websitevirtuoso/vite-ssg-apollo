export interface Country {
  id: string
  name: string
  code: string
}

export interface State {
  id: string
  name: string
  code: string
  country: Country
}

export interface City {
  id: string
  name: string
  lat: string
  lng: string
  state: State
}

export interface StateInput {
  code: string
  name: string
  country_id: number
}

export interface CityAliasInput {
  name: string
  city_id: number
}
