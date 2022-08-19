import { intercepts, users, CyUser } from './support'
import { City } from '@/modules/regions/types'

describe('Create', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
    users.navigation.create()
  })

  it('should display required fields', () => {
    cy.get('.v-input__details').contains('Phone must be a `number` type')
    cy.getBySel('user.submit').should('be.disabled')

    cy.getBySel('user.phone[0]').type('250801885599')
    cy.getBySel('user.submit').click()
    cy.getBySel('user.state').should('not.exist')
    cy.getBySel('user.city').should('not.exist')

    // @ts-expect-error unknown type
    users.getCity().then((city: City) => {
      cy.getBySel('user.country').vSelect(city.state.country.name)
      cy.wait('@queryGetStates')
      cy.getBySel('user.state').should('exist')
      cy.getBySel('user.state').errorValidation('State is a required field')
      // fill state
      cy.getBySel('user.state').vSelect(city.state.name)
      cy.wait('@queryGetCities')
      cy.getBySel('user.city').should('exist')
      cy.getBySel('user.city').errorValidation('City is a required field')
      // fill city
      cy.getBySel('user.city').type(city.name).vSelect(city.name)
    })

    cy.getBySel('user.first_name').errorValidation('First name is a required field')
    cy.getBySel('user.last_name').errorValidation('Last name is a required field')
    cy.getBySel('user.email').errorValidation('Email is a required field')
    cy.getBySel('user.password').errorValidation('Password is a required field')
    cy.getBySel('user.role').errorValidation('Role is a required field')
  })

  it('should create', () => {
    // @ts-expect-error unknown type
    users.generateUser().then((user: CyUser) => {
      cy.getBySel('user.first_name').type(user.first_name)
      cy.getBySel('user.last_name').type(user.last_name)
      cy.getBySel('user.email').type(user.email)
      cy.getBySel('user.password').type(user.password)
      user.phone.forEach((phone, index) => {
        cy.getBySel(`user.phone[${index}]`).type(String(phone))
        // add new phone if it is not last element
        if (index !== user.phone.length - 1) {
          cy.getBySel('user.add-phone').click()
        }
      })
      // cy.getBySel('user.phone').type(user.password)
      cy.getBySel('user.role').vSelect(user.role.display_name)
      cy.getBySel('user.status').vSelect(user.status)

      cy.getBySel('user.address').type(user.address)
      cy.getBySel('user.postal_code').type(user.postal_code)

      cy.getBySel('user.country').vSelect(user.city.state.country.name)
      cy.wait('@queryGetStates')
      cy.getBySel('user.state').vSelect(user.city.state.name)
      cy.wait('@queryGetCities')

      // v-autocomplete
      cy.getBySel('user.city').type(user.city.name).vSelect(user.city.name)
      cy.getBySel('user.submit').click()

      cy.wait('@mutationUserCreate').then(({ response }) => {
        // @ts-expect-error undefined variable
        expect(response.body.data.userCreate).to.exist
        // @ts-expect-error undefined variable
        expect(response.body.data.userCreate.id).to.exist
      })

      cy.notification('Record has been created')
      cy.url().should('eq', `${Cypress.config().baseUrl}/users`)
      cy.wait('@queryGetUsers')

      cy.getBySel('datatable')
        .get('tbody tr')
        .should('contain', user.first_name)
        .and('contain', user.last_name)
        .and('contain', user.last_name)
        .and('contain', user.email)
        .and('contain', user.status)
        .and('contain', user.role.display_name)
    })
  })
})
