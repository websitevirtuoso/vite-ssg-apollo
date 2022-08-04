import { intercepts, cities } from './support'
import { City, State } from '../../../types'

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
    // @ts-expect-error post unknown type
    cities.getCity().then((city: City) => {
      cities.navigation.update(city)
      cy.getBySel('city.name').find('input').clear()
      cy.getBySel('city.submit').should('be.disabled')

      cy.getBySel('city.name').errorValidation('Name is a required field')
    })
  })

  it('should update', () => {
    // @ts-expect-error city unknown type
    cities.getCity().then((city: City) => {
      cities.navigation.update(city)

      const newCity = cities.generateCity()
      // @ts-expect-error state unknown type
      cities.getState().then((state: State) => {
        cy.getBySel('city.name').find('input').clear().type(newCity.name)
        cy.getBySel('city.country').vSelect(state.country.name)
        cy.wait('@queryGetStates')
        cy.getBySel('city.state').vSelect(state.name)
        cy.getBySel('city.submit').click()

        cy.wait('@mutationCityUpsert').then(({ response }) => {
          // @ts-expect-error undefined variable
          expect(response.body.data.cityUpsert).to.exist
          // @ts-expect-error undefined variable
          expect(response.body.data.cityUpsert.id).to.exist
        })

        cy.notification('Record has been updated')
        cy.url().should('eq', `${Cypress.config().baseUrl}/cities`)
        cy.wait('@queryGetCities')

        cy.toggleElement('btn.filter', true)
        // filter by name
        cy.getBySel('filter.city.name')
          .find('input')
          .clear()
          .type(newCity.name)
          .then(() => {
            cy.wait('@queryGetCities')

            cy.getBySel('datatable')
              .get('tbody tr')
              .should('contain', newCity.name)
              .and('contain', state.country.name)
              .and('contain', state.name)
          })
      })
    })
  })
})