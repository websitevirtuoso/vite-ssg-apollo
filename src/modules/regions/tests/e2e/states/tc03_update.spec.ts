import { CyState, intercepts, states } from './support'
import { getState } from '@/composables/useCypressHelper'

describe('Update', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    cy.login()
    intercepts()
  })

  it('should display fields required', () => {
    // @ts-expect-error cyState unknown error
    getState().then((state: CyState) => {
      states.navigation.update(state)

      cy.getBySel('state.name').find('input').clear()
      cy.getBySel('state.code').find('input').clear()

      cy.getBySel('state.submit').should('be.disabled')

      cy.getBySel('state.name').errorValidation('Name is a required field')
      cy.getBySel('state.code').errorValidation('Code is a required field')
      // can't check country field it is select field
    })
  })

  it('should update', () => {
    // @ts-expect-error cyState unknown error
    getState().then((state: CyState) => {
      states.navigation.update(state)

      // @ts-expect-error cyState unknown error
      states.generateState().then((newState: CyState) => {
        cy.getBySel('state.name').find('input').clear().type(newState.name)
        cy.getBySel('state.code').find('input').clear().type(newState.code)
        cy.getBySel('state.country').vSelect(newState.country)
        cy.getBySel('state.submit').click()

        cy.wait('@mutationStateUpsert').then(({ response }) => {
          // @ts-expect-error undefined variable
          expect(response.body.data.stateUpsert).to.exist
          // @ts-expect-error undefined variable
          expect(response.body.data.stateUpsert.id).to.exist
        })

        cy.notification('Record has been updated')
        cy.url().should('eq', `${Cypress.config().baseUrl}/states`)
        cy.wait('@queryGetStates')

        cy.toggleElement('btn.filter', true)
        // filter by name
        cy.getBySel('filter.state.name')
          .find('input')
          .clear()
          .type(newState.name)
          .then(() => {
            cy.wait('@queryGetStates')

            cy.getBySel('datatable')
              .get('tbody tr')
              .should('contain', newState.name)
              .and('contain', newState.code)
              .and('contain', newState.country)
          })
      })
    })
  })
})
