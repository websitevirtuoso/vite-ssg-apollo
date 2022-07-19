import { intercepts, aliases } from './support'
import { City } from '../../../types'

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
    cy.getBySel('alias.country').errorValidation('Country is a required field')
    cy.getBySel('alias.state').should('not.exist')
    cy.getBySel('alias.city').should('not.exist')

    // @ts-expect-error city unknown type
    aliases.getCity().then((city: City) => {
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

  it('should create', () => {
    const cityAlias = aliases.generateCityAlias()
    // @ts-expect-error city unknown type
    aliases.getCity().then((city: City) => {
      cy.getBySel('alias.name').type(cityAlias.name)
      cy.getBySel('alias.country').vSelect(city.state.country.name)
      cy.wait('@queryGetStates')
      cy.getBySel('alias.state').vSelect(city.state.name)
      cy.wait('@queryGetCities')

      // v-autocomplete
      cy.getBySel('alias.city').type(city.name).vSelect(city.name)
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
