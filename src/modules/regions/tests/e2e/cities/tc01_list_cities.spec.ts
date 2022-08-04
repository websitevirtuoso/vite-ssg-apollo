import { intercepts, cities } from './support'

describe('Cities Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('navigate from dashboard, datatable and to create form', () => {
    cities.navigation.create(false)
  })

  it('should see list of posts', () => {
    cities.navigation.show(false)

    cy.getDataTableHeaderLength(7)
    cy.getDataTableBodyLength(7)
  })
})
