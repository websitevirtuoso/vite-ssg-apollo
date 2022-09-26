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

  it('should display required fields', () => {
    // @ts-expect-error cityAlias unknown type
    cy.create('App\\Models\\CityAlias').then((cityAlias: CyCityAlias) => {
      aliases.navigation.update(cityAlias)

      cy.getBySel('alias.name').should('be.visible')
      cy.getBySel('region.country').should('be.visible')
      cy.getBySel('region.state').should('be.visible')
      cy.getBySel('region.city').should('be.visible')

      cy.wait('@queryGetStates')
      cy.wait('@queryGetCities')
      // get country vselect text
      cy.getBySel('region.country')
        .find('.v-select__selection-text')
        .then(($el) => {
          const selectedCountry = $el[0].textContent

          // to make sure that gql query works we need to get another country to refetch items
          // @ts-expect-error city unknown type
          aliases.getCity(selectedCountry).then((city: City) => {
            cy.getBySel('region.country').vSelect(city.state.country.name)
            cy.wait('@queryGetStates')
            cy.getBySel('alias.submit').click()
            cy.getBySel('region.state').should('exist')
            cy.getBySel('region.state').errorValidation('State is a required field')

            cy.getBySel('region.state').vSelect(city.state.name)
            cy.wait('@queryGetCities')
            cy.getBySel('region.city').should('exist')
            cy.getBySel('region.city').errorValidation('City is a required field')
          })
        })
    })
  })

  it('should update', () => {
    // @ts-expect-error cityAlias unknown type
    cy.create('App\\Models\\CityAlias').then((cityAlias: CyCityAlias) => {
      aliases.navigation.update(cityAlias)

      cy.wait('@queryGetStates')
      cy.wait('@queryGetCities')
      const newCityAlias = aliases.generateCityAlias()

      cy.getBySel('region.country')
        .find('.v-select__selection-text')
        .then(($el) => {
          const selectedCountry = $el[0].textContent

          // to make sure that gql query works we need to get another country to refetch items
          // @ts-expect-error city unknown type
          aliases.getCity(selectedCountry).then((city: City) => {
            cy.getBySel('alias.name').find('input').clear().type(newCityAlias.name)
            cy.getBySel('region.country').vSelect(city.state.country.name)
            cy.wait('@queryGetStates')
            cy.getBySel('region.state').vSelect(city.state.name)
            cy.wait('@queryGetCities')
            cy.getBySel('region.city').type(city.name).vSelect(city.name)
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
