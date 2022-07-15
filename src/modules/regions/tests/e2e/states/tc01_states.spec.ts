import { intercepts, states } from './support'
import { stateUpsert } from './graphql/mutations/stateUpsert'

describe('States Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })

  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('navigate from dashboard, datatable and to create form', () => {
    states.navigation.create(false)
  })

  it.only('should see list of states', () => {
    cy.gqlRequest('/api', stateUpsert, states.generateState(), 'Create State Record')
    states.navigation.show(false)

    cy.getDataTableHeaderLength(5)
    cy.getDataTableBodyLength(5)
  })
})
