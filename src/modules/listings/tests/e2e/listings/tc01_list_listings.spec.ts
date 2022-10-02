import { intercepts, listings } from './support'

describe('Listings Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
    listings.truncate()
    cy.create('App\\Models\\Listing')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('navigate from dashboard, datatable and to create form', () => {
    listings.navigation.create(false)
  })

  it('should see list of listings', () => {
    listings.navigation.show(false)
    cy.getBySel('listing.card').should('have.length', 1)
  })
})
