before(() => {
  cy.refreshDatabase()
  cy.seed('CypressDatabaseSeeder')
})

it('access denied', () => {
  cy.login()
  cy.visit('/access-denied')

  cy.getBySel('title').should('exist')
  cy.getBySel('subtitle').should('exist')
  cy.getBySel('description').should('exist')
})
