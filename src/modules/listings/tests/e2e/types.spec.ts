describe('listing types section', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
    cy.seed('ListingTypeTableSeeder')
  })
  it('should see list of listing types', () => {
    cy.intercept('POST', '/api/public?operation=GetListingTypes').as('queryGetListingTypes')
    cy.login()
    cy.visit('/')

    cy.toggleSideMenu(true)
    // check menu direct to countries
    cy.getBySel('listing-types').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/listings/types`)

    cy.wait('@queryGetListingTypes').then(({ response }) => {
      // @ts-expect-error undefined variable
      expect(response.body.data.listing_types).to.exist
    })

    // check page struct
    cy.getBySel('btn.create').should('not.exist')
    cy.getBySel('btn.remove').should('not.exist')

    cy.getDataTableHeaderLength(3)
    cy.getDataTableBodyLength(3)
  })
})
