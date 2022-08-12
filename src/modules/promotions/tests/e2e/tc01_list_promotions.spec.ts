import { intercepts, promos } from './support'

describe('Promos Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
    promos.truncate()
    cy.create('App\\Models\\Promo')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('navigate from dashboard, datatable and to create form', () => {
    promos.navigation.create(false)
  })

  it('should see list of promos', () => {
    promos.navigation.show(false)

    cy.getDataTableHeaderLength(9)
    cy.getDataTableBodyLength(9)
  })
})
