export interface Country {
  id: string
  name: string
  code: string
}

export interface State {
  id: string
  name: string
  code: string
  country: {
    id: string
    name: string
    code: string
  }
}

export interface StateInput {
  code: string
  name: string
  country_id: number
}
