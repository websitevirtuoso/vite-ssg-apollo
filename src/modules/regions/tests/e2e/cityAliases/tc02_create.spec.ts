import { intercepts, aliases } from './support'
import { City } from '../../../types'
import { getCity } from '@/composables/useCypressHelper'

describe('Create', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
    aliases.navigation.create()
  })
  afterEach(() => {
    aliases.truncate()
  })

  it('should display required fields', () => {
    cy.getBySel('alias.submit').click()
    cy.getBySel('alias.submit').should('be.disabled')

    cy.getBySel('alias.name').errorValidation('Name is a required field')
    cy.getBySel('region.country').errorValidation('Country is a required field')
    cy.getBySel('region.state').should('not.exist')
    cy.getBySel('region.city').should('not.exist')

    // @ts-expect-error city unknown type
    getCity().then((city: City) => {
      cy.getBySel('region.country').vSelect(city.state.country.name)
      cy.wait('@queryGetStates')
      cy.getBySel('region.state').should('exist')
      cy.getBySel('region.state').errorValidation('State is a required field')

      cy.getBySel('region.state').vSelect(city.state.name)
      cy.wait('@queryGetCities')
      cy.getBySel('region.city').should('exist')
      cy.getBySel('region.city').errorValidation('City is a required field')
    })
  })

  it('should create', () => {
    const cityAlias = aliases.generateCityAlias()
    // @ts-expect-error city unknown type
    getCity().then((city: City) => {
      cy.getBySel('alias.name').type(cityAlias.name)
      cy.getBySel('region.country').vSelect(city.state.country.name)
      cy.wait('@queryGetStates')
      cy.getBySel('region.state').vSelect(city.state.name)
      cy.wait('@queryGetCities')

      // v-autocomplete
      cy.getBySel('region.city').type(city.name).vSelect(city.name)
      cy.getBySel('alias.submit').click()

      cy.wait('@mutationCityAliasUpsert').then(({ response }) => {
        // @ts-expect-error undefined variable
        expect(response.body.data.cityAliasUpsert).to.exist
        // @ts-expect-error undefined variable
        expect(response.body.data.cityAliasUpsert.id).to.exist
      })

      cy.notification('Record has been created')
      cy.url().should('eq', `${Cypress.config().baseUrl}/city-aliases`)
      cy.wait('@queryGetCityAliases')

      cy.getBySel('datatable')
        .get('tbody tr')
        .should('contain', cityAlias.name)
        .and('contain', city.name)
        .and('contain', city.state.name)
        .and('contain', city.state.country.name)
    })
  })
})
