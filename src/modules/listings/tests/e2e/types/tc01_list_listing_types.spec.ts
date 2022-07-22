import { intercepts, listingTypes } from './support'

describe('Listing Types Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
    listingTypes.truncate()
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('should see list of listing types', () => {
    cy.create('App\\Models\\ListingType')
    listingTypes.navigation.show(false)

    // check page struct
    cy.getBySel('btn.create').should('not.exist')
    cy.getBySel('btn.remove').should('not.exist')

    cy.getDataTableHeaderLength(4)
    cy.getDataTableBodyLength(4)
  })
})
