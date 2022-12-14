import { intercepts, cities } from './support'
import { State } from '../../../types'
import { getState } from '@/composables/useCypressHelper'

describe('Create', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
    cities.navigation.create()
  })

  it('should display required fields', () => {
    cy.getBySel('city.submit').click()
    cy.getBySel('city.submit').should('be.disabled')

    cy.getBySel('city.name').errorValidation('Name is a required field')
    cy.getBySel('region.country').errorValidation('Country is a required field')
    cy.getBySel('region.state').should('not.exist')

    // @ts-expect-error state unknown type
    getState().then((state: State) => {
      cy.getBySel('region.country').vSelect(state.country.name)
      cy.wait('@queryGetStates')
      cy.getBySel('region.state').should('exist')
      cy.getBySel('region.state').errorValidation('State is a required field')
    })
  })

  it('should create', () => {
    // @ts-expect-error state unknown type
    getState().then((state: State) => {
      const newCity = cities.generateCity()

      cy.getBySel('gmap-autocomplete').type('Vancouver').get('div.pac-container .pac-item').should('be.visible').first().click()
      cy.getBySel('city.name').find('input').clear().type(newCity.name)
      cy.getBySel('region.country').vSelect(state.country.name)
      cy.wait('@queryGetStates')
      cy.getBySel('region.state').vSelect(state.name)
      cy.getBySel('city.submit').click()

      cy.wait('@mutationCityUpsert').then(({ response }) => {
        // @ts-expect-error undefined variable
        expect(response.body.data.cityUpsert).to.exist
        // @ts-expect-error undefined variable
        expect(response.body.data.cityUpsert.id).to.exist
      })

      cy.notification('Record has been created')
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
