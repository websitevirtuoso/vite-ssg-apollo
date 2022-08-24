import { faker } from '@faker-js/faker'
import { Country, State } from '../../../types'

type CyState = {
  id: string | undefined
  name: string
  code: string
  country: string
  country_id: string
}

const intercepts = () => {
  cy.intercept('POST', '/api/public?operation=GetStates').as('queryGetStates')
  cy.intercept('POST', '/api/public?operation=GetCountries').as('queryGetCountries')
  cy.intercept('POST', '/api?operation=StateUpsert').as('mutationStateUpsert')
}

const states = {
  generateState: () => {
    // @ts-expect-error variable undefined
    return cy.php('App\\Models\\Country::first()').then((country: Country) => {
      return {
        name: faker.lorem.word(10),
        code: faker.address.stateAbbr(),
        country_id: country.id,
        country: country.name,
      } as CyState
    })
  },
  getState: () => {
    // @ts-expect-error variable undefined
    return cy.php('App\\Models\\State::with(\'country\')->first()').then((state: State) => {
      return {
        id: state.id,
        name: state.name,
        code: state.code,
        country_id: state.country.id,
        country: state.country.name,
      } as CyState
    })
  },
  navigation: {
    create: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/states/create')
      } else {
        states.navigation.show()
        cy.getBySel('btn.create').should('have.length', 1).click()
      }
      cy.url().should('eq', `${Cypress.config().baseUrl}/states/create`)
    },
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/states')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Region').click()
        cy.getBySel('States').click()
      }
      cy.wait('@queryGetStates')
      cy.url().should('eq', `${Cypress.config().baseUrl}/states`)
    },
    update: (state: CyState) => {
      states.navigation.show()

      cy.toggleElement('btn.filter', true)

      // filter by name
      cy.getBySel('filter.state.name')
        .find('input')
        .clear()
        .type(state.name)
        .then(() => {
          cy.wait('@queryGetStates')

          cy.getBySel('datatable').find('tbody tr').contains(state.name).parents('tr').find('[data-test="update"]').click()
          cy.url().should('eq', `${Cypress.config().baseUrl}/states/${state.id}/update`)
          cy.wait('@queryGetStates')
        })
    },
  },
}

export { intercepts, states, CyState }
