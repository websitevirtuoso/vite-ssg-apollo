import { intercepts, users, CyUser } from './support'
import { City } from '@/modules/regions/types'

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
    // @ts-expect-error variable undefined
    cy.create('App\\Models\\User').then((user: CyUser) => {
      users.navigation.update(user)

      cy.getBySel('user.state').should('be.visible')
      cy.getBySel('user.city').should('be.visible')
      cy.getBySel('user.password').should('not.exist')

      // clear all fields
      cy.getBySel('user.phone[0]').find('input').clear()
      cy.getBySel('user.first_name').find('input').clear()
      cy.getBySel('user.last_name').find('input').clear()
      cy.getBySel('user.email').find('input').clear()

      // get country vselect text
      cy.getBySel('user.country')
        .find('.v-select__selection-text')
        .then(($el) => {
          const selectedCountry = $el[0].textContent

          // to make sure that gql query works we need to get another country to refetch items
          // @ts-expect-error city unknown type
          users.getCity(selectedCountry).then((city: City) => {
            cy.getBySel('user.country').vSelect(city.state.country.name)
            cy.wait('@queryGetStates')
            cy.getBySel('user.state').should('exist')
            cy.getBySel('user.state').errorValidation('State is a required field')

            cy.getBySel('user.state').vSelect(city.state.name)
            cy.wait('@queryGetCities')
            cy.getBySel('user.city').should('exist')
            // todo I think bug in vuetify. when update field has value integer. need check this later
            // cy.getBySel('user.city').errorValidation('City is a required field')
          })
        })

      // button still should be disabled

      cy.get('.v-input__details').contains('Phone must be a `number` type')
      cy.getBySel('user.first_name').errorValidation('First name is a required field')
      cy.getBySel('user.last_name').errorValidation('Last name is a required field')
      cy.getBySel('user.email').errorValidation('Email is a required field')

      cy.getBySel('user.phone[0]').type('250801885599')
      cy.getBySel('user.first_name').type('first_name')
      cy.getBySel('user.last_name').type('last_name')
      cy.getBySel('user.email').type('email@test.com')

      cy.getBySel('user.submit').click()
      cy.getBySel('user.role').errorValidation('Role field must have at least 1 items')
    })
  })

  it.only('should update', () => {
    // @ts-expect-error user unknown type
    cy.create('App\\Models\\User').then((originUser: CyUser) => {
      users.navigation.update(originUser)
      // @ts-expect-error user unknown type
      users.generateUser().then((newUser: CyUser) => {
        cy.getBySel('user.first_name').find('input').clear().type(newUser.first_name)
        cy.getBySel('user.last_name').find('input').clear().type(newUser.last_name)
        cy.getBySel('user.email').find('input').clear().type(newUser.email)
        newUser.phone.forEach((phone, index) => {
          cy.getBySel(`user.phone[${index}]`).find('input').clear().type(String(phone))
          // add new phone if it is not last element
          if (index !== newUser.phone.length - 1) {
            cy.getBySel('user.add-phone').click()
          }
        })
        cy.getBySel('user.role').vSelect(newUser.role.display_name)
        cy.getBySel('user.status').vSelect(newUser.status)

        cy.getBySel('user.address').find('input').clear().type(newUser.address)
        cy.getBySel('user.postal_code').find('input').clear().type(newUser.postal_code)

        cy.getBySel('user.country').vSelect(newUser.city.state.country.name)
        cy.wait('@queryGetStates')
        cy.getBySel('user.state').vSelect(newUser.city.state.name)
        cy.wait('@queryGetCities')

        // v-autocomplete
        cy.getBySel('user.city').find('input').clear().type(newUser.city.name).vSelect(newUser.city.name)
        cy.getBySel('user.submit').click()

        cy.wait('@mutationUserUpdate').then(({ response }) => {
          // @ts-expect-error undefined variable
          expect(response.body.data.userUpdate).to.exist
          // @ts-expect-error undefined variable
          expect(response.body.data.userUpdate.id).to.exist
        })

        cy.notification('Record has been updated')
        cy.url().should('eq', `${Cypress.config().baseUrl}/users`)
        cy.wait('@queryGetUsers')

        cy.toggleElement('btn.filter', true)
        cy.getBySel('filter.user.first_name')
          .find('input')
          .clear()
          .type(newUser.first_name)
          .then(() => {
            cy.wait('@queryGetUsers')

            cy.getBySel('datatable')
              .get('tbody tr')
              .should('contain', newUser.first_name)
              .and('contain', newUser.last_name)
              .and('contain', newUser.last_name)
              .and('contain', newUser.email)
              .and('contain', newUser.status)
              .and('contain', newUser.role.display_name)
          })
      })
    })
  })
})
