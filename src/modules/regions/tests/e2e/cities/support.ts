import { faker } from '@faker-js/faker'
import { City, State } from '../../../types'

const intercepts = () => {
  cy.intercept('POST', '/api/public?operation=GetCities').as('queryGetCities')
  cy.intercept('POST', '/api/public?operation=GetCountries').as('queryGetCountries')
  cy.intercept('POST', '/api/public?operation=GetStates').as('queryGetStates')
  cy.intercept('POST', '/api?operation=CityUpsert').as('mutationCityUpsert')
}

const cities = {
  generateCity: () => {
    return {
      name: faker.lorem.word(10),
    }
  },
  getCity: () => {
    return (
      cy
        .php("App\\Models\\City::with('state')->inRandomOrder()->first()")
        // @ts-expect-error variable undefined
        .then((city: City) => city)
    )
  },
  getState: () => {
    return (
      cy
        .php("App\\Models\\State::with('country')->inRandomOrder()->first()")
        // @ts-expect-error variable undefined
        .then((state: State) => state)
    )
  },
  navigation: {
    create: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/cities/create')
      } else {
        cities.navigation.show()
        cy.getBySel('btn.create').should('have.length', 1).click()
      }
      cy.wait('@queryGetCountries')
      cy.url().should('eq', `${Cypress.config().baseUrl}/cities/create`)
    },
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/cities')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Region').click()
        cy.getBySel('Cities').click()
      }
      cy.wait('@queryGetCities')
      cy.url().should('eq', `${Cypress.config().baseUrl}/cities`)
    },
    update: (city: City) => {
      cities.navigation.show()

      cy.toggleElement('btn.filter', true)

      // filter by id because city name is not unique
      cy.getBySel('filter.city.id')
        .find('input')
        .clear()
        .type(`${city.id}{enter}`)
        .then(() => {
          cy.wait('@queryGetCities')

          cy.getBySel('datatable').contains(city.name).parents('tr').find('[data-test="update"]').click()
          cy.url().should('eq', `${Cypress.config().baseUrl}/cities/${city.id}/update`)
          cy.wait('@queryGetCountries')
          cy.wait('@queryGetCities')
          cy.wait('@queryGetStates')
        })
    },
  },
}

export { intercepts, cities }
