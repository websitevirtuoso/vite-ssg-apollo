describe('permissions section', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  it('should see list of permissions', () => {
    cy.intercept('POST', '/api?operation=GetPermissions').as('queryGetPermissions')
    cy.login()
    cy.visit('/')

    cy.toggleSideMenu(true)
    // check menu direct to countries
    cy.getBySel('permissions').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/permissions`)

    // check that Request been made
    cy.wait('@queryGetPermissions').then(({ response }) => {
      // @ts-expect-error undefined variable
      expect(response.body.data.permissions).to.exist
    })

    // check page struct
    cy.getBySel('btn.create').should('not.exist')
    cy.getBySel('btn.remove').should('not.exist')

    cy.getDataTableHeaderLength(6)
    cy.getDataTableBodyLength(6)
  })
})
