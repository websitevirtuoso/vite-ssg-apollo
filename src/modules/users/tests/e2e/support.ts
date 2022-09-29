import { faker } from '@faker-js/faker'
import { City } from '@/modules/regions/types'
import { Role } from '@/modules/auth/utils/types'
import { UserInput } from '@/modules/users/types'
import { User_Status } from '@/plugins/apollo/schemaTypesGenerated'
import { getCity, getRole } from '@/composables/useCypressHelper'

interface CyUser extends UserInput {
  id: string | undefined
  role: {
    id: string
    display_name: string
  }
  city: City
}

const intercepts = () => {
  cy.intercept('POST', '/api?operation=GetUsers').as('queryGetUsers')
  cy.intercept('POST', '/api/public?operation=GetCities').as('queryGetCities')
  cy.intercept('POST', '/api/public?operation=GetStates').as('queryGetStates')
  cy.intercept('POST', '/api/public?operation=GetCountries').as('queryGetCountries')
  cy.intercept('POST', '/api?operation=GetRoles').as('queryGetRoles')
  cy.intercept('POST', '/api?operation=UserCreate').as('mutationUserCreate')
  cy.intercept('POST', '/api?operation=UserUpdate').as('mutationUserUpdate')
}

const users = {
  generateUser: (): CyUser => {
    // @ts-expect-error unknown type
    return getRole().then((role: Role) => {
      // @ts-expect-error unknown type
      return getCity().then((city: City) => {
        const userStatuses = Object.values(User_Status)
        const randomStatus = userStatuses[Math.floor(Math.random() * userStatuses.length)]
        return {
          first_name: faker.name.firstName(),
          last_name: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phone: [faker.phone.number('#########'), faker.phone.number('#########')],
          address: faker.address.streetAddress(),
          postal_code: faker.address.zipCode('### ###'),
          status: randomStatus,
          role: {
            id: role.id,
            display_name: role.display_name,
          },
          city: city,
        }
      })
    })
  },
  navigation: {
    create: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/users/create')
      } else {
        users.navigation.show()
        cy.getBySel('btn.create').should('have.length', 1).click()
      }
      cy.wait('@queryGetRoles')
      cy.wait('@queryGetCountries')
      cy.url().should('eq', `${Cypress.config().baseUrl}/users/create`)
    },
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/users')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Users').click()
      }
      cy.wait('@queryGetUsers')
      cy.url().should('eq', `${Cypress.config().baseUrl}/users`)
    },
    update: (user: CyUser) => {
      users.navigation.show()

      cy.toggleElement('btn.filter', true)

      // filter by name
      cy.getBySel('filter.user.first_name')
        .find('input')
        .clear()
        .type(user.first_name)
        .then(() => {
          cy.wait('@queryGetUsers')

          cy.getBySel('datatable').find('tbody tr').contains(user.first_name).parents('tr').find('[data-test="update"]').click()
          cy.url().should('eq', `${Cypress.config().baseUrl}/users/${user.id}/update`)
          cy.wait('@queryGetRoles')
          cy.wait('@queryGetUsers')
          cy.wait('@queryGetStates')
          cy.wait('@queryGetCities')
        })
    },
  },
}

export { intercepts, users, CyUser }
