import { intercepts, states, CyState } from './support'

describe('Create', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    cy.login()
    intercepts()
    states.navigation.create()
  })

  it('should display required fields', () => {
    cy.getBySel('state.submit').click()
    cy.getBySel('state.submit').should('be.disabled')

    cy.getBySel('state.name').errorValidation('Name is a required field')
    cy.getBySel('state.code').errorValidation('Code is a required field')
    cy.getBySel('state.country').errorValidation('Country is a required field')

    // Max 10 chars
    cy.getBySel('state.code').type('qwertasdfgh')
    cy.getBySel('state.code').errorValidation('Code must be at most 10 characters').should('be.visible')
  })

  it('should create', () => {
    // @ts-expect-error cyState unknown error
    states.generateState().then((state: CyState) => {
      cy.getBySel('state.name').type(state.name)
      cy.getBySel('state.code').type(state.code)
      cy.getBySel('state.country').vSelect(state.country)
      cy.getBySel('state.submit').click()

      cy.wait('@mutationStateUpsert').then(({ response }) => {
        // @ts-expect-error undefined variable
        expect(response.body.data.stateUpsert).to.exist
        // @ts-expect-error undefined variable
        expect(response.body.data.stateUpsert.id).to.exist
      })

      cy.notification('Record has been created')
      cy.url().should('eq', `${Cypress.config().baseUrl}/states`)
      cy.wait('@queryGetStates')

      cy.toggleElement('btn.filter', true)
      // filter by name
      cy.getBySel('filter.state.name')
        .type(state.name)
        .then(() => {
          cy.wait('@queryGetStates')

          // using filter to get just created state
          cy.getBySel('datatable').get('tbody tr').should('contain', state.name).and('contain', state.code).and('contain', state.country)
        })
    })
  })
})
