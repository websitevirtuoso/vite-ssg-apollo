import { intercepts, aliases, CyCityAlias } from './support'
import { City } from '../../../types'

describe('Update', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it.only('should display required fields', () => {
    // @ts-expect-error cityAlias unknown type
    cy.create('App\\Models\\CityAlias').then((cityAlias: CyCityAlias) => {
      aliases.navigation.update(cityAlias)

      cy.getBySel('alias.name').should('be.visible')
      cy.getBySel('alias.country').should('be.visible')
      cy.getBySel('alias.state').should('be.visible')
      cy.getBySel('alias.city').should('be.visible')

      cy.wait('@queryGetStates')
      cy.wait('@queryGetCities')
      // get country vselect text
      cy.getBySel('alias.country')
        .find('.v-select__selection-text')
        .then(($el) => {
          const selectedCountry = $el[0].textContent

          // to make sure that gql query works we need to get another country to refetch items
          // @ts-expect-error city unknown type
          aliases.getCity(selectedCountry).then((city: City) => {
            cy.getBySel('alias.country').vSelect(city.state.country.name)
            cy.wait('@queryGetStates')
            cy.getBySel('alias.state').should('exist')
            cy.getBySel('alias.state').errorValidation('State is a required field')

            cy.getBySel('alias.state').vSelect(city.state.name)
            cy.wait('@queryGetCities')
            cy.getBySel('alias.city').should('exist')
            cy.getBySel('alias.city').errorValidation('City is a required field')
          })
        })
    })
  })

  it.only('should update', () => {
    // @ts-expect-error cityAlias unknown type
    cy.create('App\\Models\\CityAlias').then((cityAlias: CyCityAlias) => {
      aliases.navigation.update(cityAlias)

      cy.wait('@queryGetStates')
      cy.wait('@queryGetCities')
      const newCityAlias = aliases.generateCityAlias()

      cy.getBySel('alias.country')
        .find('.v-select__selection-text')
        .then(($el) => {
          const selectedCountry = $el[0].textContent

          // to make sure that gql query works we need to get another country to refetch items
          // @ts-expect-error city unknown type
          aliases.getCity(selectedCountry).then((city: City) => {
            cy.getBySel('alias.name').find('input').clear().type(newCityAlias.name)
            cy.getBySel('alias.country').vSelect(city.state.country.name)
            cy.wait('@queryGetStates')
            cy.getBySel('alias.state').vSelect(city.state.name)
            cy.wait('@queryGetCities')
            cy.getBySel('alias.city').type(city.name).vSelect(city.name)
            cy.getBySel('alias.submit').click()

            cy.wait('@mutationCityAliasUpsert').then(({ response }) => {
              // @ts-expect-error undefined variable
              expect(response.body.data.cityAliasUpsert).to.exist
              // @ts-expect-error undefined variable
              expect(response.body.data.cityAliasUpsert.id).to.exist
            })

            cy.notification('Record has been updated')
            cy.url().should('eq', `${Cypress.config().baseUrl}/city-aliases`)
            cy.wait('@queryGetCityAliases')

            // need to reset filter in any case
            cy.toggleElement('btn.filter', true)
            cy.getBySel('filter.alias.name').find('input').clear()
            cy.wait('@queryGetCityAliases')

            cy.getBySel('datatable')
              .get('tbody tr')
              .should('contain', newCityAlias.name)
              .and('contain', city.name)
              .and('contain', city.state.name)
              .and('contain', city.state.country.name)
          })
        })
    })
  })
})
