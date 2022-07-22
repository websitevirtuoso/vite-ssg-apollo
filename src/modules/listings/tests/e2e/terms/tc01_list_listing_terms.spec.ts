import { intercepts, listingTerms } from './support'

describe('Listing Terms Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
    listingTerms.truncate()
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('should see list of listing terms', () => {
    cy.create('App\\Models\\ListingTerm')
    listingTerms.navigation.show(false)

    // check page struct
    cy.getBySel('btn.create').should('not.exist')
    cy.getBySel('btn.remove').should('not.exist')

    cy.getDataTableHeaderLength(4)
    cy.getDataTableBodyLength(4)
  })
})
