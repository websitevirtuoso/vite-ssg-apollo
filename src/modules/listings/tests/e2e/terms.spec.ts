describe('listing terms section', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
    cy.seed('ListingTermTableSeeder')
  })
  it('should see list of listing terms', () => {
    cy.intercept('POST', '/api/public?operation=ListingTermsAll').as('queryListingTermsAll')
    cy.login()
    cy.visit('/')

    cy.toggleSideMenu(true)
    // check menu direct to countries
    cy.getBySel('listing-terms').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/listings/terms`)

    cy.wait('@queryListingTermsAll').then(({ response }) => {
      // @ts-expect-error undefined variable
      expect(response.body.data.listing_terms).to.exist
    })

    // check page struct
    cy.getBySel('btn.create').should('not.exist')
    cy.getBySel('btn.remove').should('not.exist')

    cy.getDataTableHeaderLength(3)
    cy.getDataTableBodyLength(3)
  })
})
