before(() => {
  cy.refreshDatabase()
  cy.seed('CypressDatabaseSeeder')
})

it('page not found', () => {
  cy.login()
  cy.visit('/404')

  cy.getBySel('title').should('exist')
  cy.getBySel('subtitle').should('exist')
  cy.getBySel('description').should('exist')
})
