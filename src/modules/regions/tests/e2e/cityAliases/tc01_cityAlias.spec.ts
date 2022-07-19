import { intercepts, aliases } from './support'

describe('City Alias Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('navigate from dashboard, datatable and to create form', () => {
    aliases.navigation.create(false)
  })

  it('should see list of city aliases', () => {
    cy.create('App\\Models\\CityAlias')
    aliases.navigation.show(false)

    cy.getDataTableHeaderLength(6)
    cy.getDataTableBodyLength(6)
  })
})
