export const stateUpsert = `
  mutation StateUpsert ($id: ID, $code: String!, $name: String!, $country_id: ID!) {
    stateUpsert (id: $id, code: $code, name: $name, country_id: $country_id) {}
  }
`
