import { intercepts, states } from './support'

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

  it('should see list of states', () => {
    states.navigation.show(false)

    cy.getDataTableHeaderLength(5)
    cy.getDataTableBodyLength(5)
  })
})
