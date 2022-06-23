describe('Login.vue', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })

  beforeEach(() => {
    cy.intercept('POST', '/api/public?operation=Login').as('mutateLogin')
    cy.intercept('POST', '/api?operation=LogOut').as('mutateLogOut')
    cy.visit('/login')
  })

  it('should redirect unauthenticated user to sign in', () => {
    cy.visit('/home')
    cy.location('pathname').should('equal', '/login')
  })

  it('should display that invalid credentials', () => {
    cy.getBySel('login.email').type('fakeemail@gmail.com')
    cy.getBySel('login.password').type('fakePassword')
    cy.getBySel('login.submit').click()
    cy.wait('@mutateLogin')
    // todo need rebuild notification plugin to check message here
    // cy.getBySel('error.notification')
    //   .contains('These credentials do not match our records.')
    //   .should('be.visible')

    // and still be on the same URL
    cy.url().should('include', 'login')
  })

  it('should display password required fields', () => {
    cy.getBySel('login.submit').click()
    cy.getBySel('login.email').errorValidation('E-Mail Address is a required field').should('be.visible')
    cy.getBySel('login.password').errorValidation('Password is a required field').should('be.visible')

    cy.url().should('include', 'login')
  })

  it('should allow to login', () => {
    cy.visit('/login')
    cy.getBySel('login.email').type(Cypress.env('userEmail'))
    cy.getBySel('login.password').type(Cypress.env('userPassword'))
    cy.getBySel('login.submit').click()

    cy.wait('@mutateLogin').then(() => {
      // Check for our localStorage item:
      expect(localStorage.getItem('user')).exist
    })

    cy.getBySel('logout').click()
    cy.wait('@mutateLogOut')
    cy.url().should('include', 'login')
  })
})
