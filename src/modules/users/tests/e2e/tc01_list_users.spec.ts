import { intercepts, users } from './support'

describe('Users Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('navigate from dashboard, datatable and to create form', () => {
    users.navigation.create(false)
  })

  it('should see list of users', () => {
    users.navigation.show(false)

    cy.getDataTableHeaderLength(10)
    cy.getDataTableBodyLength(10)
  })
})
