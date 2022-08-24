import { faker } from '@faker-js/faker'
import { City, CityAliasInput } from '../../../types'

interface CyCityAlias extends CityAliasInput {
  id: string | undefined
}

const intercepts = () => {
  cy.intercept('POST', '/api/public?operation=GetCityAliases').as('queryGetCityAliases')
  cy.intercept('POST', '/api/public?operation=GetCities').as('queryGetCities')
  cy.intercept('POST', '/api/public?operation=GetStates').as('queryGetStates')
  cy.intercept('POST', '/api/public?operation=GetCountries').as('queryGetCountries')
  cy.intercept('POST', '/api?operation=CityAliasUpsert').as('mutationCityAliasUpsert')
}

const aliases = {
  truncate: () => {
    cy.php("DB::table('city_aliases')->delete()")
  },
  generateCityAlias: (): { name: string } => {
    return {
      name: faker.lorem.word(10),
    }
  },
  getCity: (selectWhereCityNot?: string) => {
    let whereCountryNot = ''
    if (selectWhereCityNot) {
      whereCountryNot = `->whereHas('state.country', function ($query) { $query->where('name','!=','${selectWhereCityNot}'); })`
    }
    return (
      cy
        .php(`App\\Models\\City::with(['state', 'state.country'])->inRandomOrder()${whereCountryNot}->first()`)
        // @ts-expect-error variable undefined
        .then((city: City) => {
          return {
            id: city.id,
            name: city.name,
            state: {
              id: city.state.id,
              name: city.state.name,
              country: {
                id: city.state.country.id,
                name: city.state.country.name,
              },
            },
          } as City
        })
    )
  },
  navigation: {
    create: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/city-aliases/create')
      } else {
        aliases.navigation.show()
        cy.getBySel('btn.create').should('have.length', 1).click()
      }
      cy.wait('@queryGetCountries')
      cy.url().should('eq', `${Cypress.config().baseUrl}/city-aliases/create`)
    },
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/city-aliases')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Region').click()
        cy.getBySel('City Aliases').click()
      }
      cy.wait('@queryGetCityAliases')
      cy.url().should('eq', `${Cypress.config().baseUrl}/city-aliases`)
    },
    update: (alias: CyCityAlias) => {
      aliases.navigation.show()

      cy.toggleElement('btn.filter', true)

      // filter by name
      cy.getBySel('filter.alias.name')
        .find('input')
        .clear()
        .type(alias.name)
        .then(() => {
          cy.wait('@queryGetCityAliases')

          cy.getBySel('datatable').find('tbody tr').contains(alias.name).parents('tr').find('[data-test="update"]').click()
          cy.url().should('eq', `${Cypress.config().baseUrl}/city-aliases/${alias.id}/update`)
          cy.wait('@queryGetCityAliases')
        })
    },
  },
}

export { intercepts, aliases, CyCityAlias }
