describe('countries section', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  it('should see list of countries', () => {
    cy.intercept('POST', '/api/public?operation=CountriesAll').as('CountriesAll')
    cy.login()
    cy.visit('/')

    cy.toggleSideMenu(true)
    // check menu direct to countries
    cy.getBySel('Region').click()
    cy.getBySel('Countries').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/countries`)

    // check that Request been made
    cy.wait('@CountriesAll').then(({ response }) => {
      // @ts-expect-error undefined variable
      expect(response.body.data.countries).to.exist
    })

    // check page struct
    cy.getBySel('btn.create').should('not.exist')
    cy.getBySel('btn.remove').should('not.exist')

    cy.getDataTableHeaderLength(3)
    cy.getDataTableBodyLength(3)
  })
})
