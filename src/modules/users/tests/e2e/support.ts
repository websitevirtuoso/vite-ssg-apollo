import { faker } from '@faker-js/faker'
import { City, State } from '@/modules/regions/types'
import { Role } from '@/modules/auth/utils/types'
import { userStatusesItems } from '../../enums'
import { UserInput } from '@/modules/users/types'
import { CyState } from '@/modules/regions/tests/e2e/states/support'

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
    return users.getRole().then((role: Role) => {
      // @ts-expect-error unknown type
      return users.getCity().then((city: City) => {
        const randomStatus = userStatusesItems[Math.floor(Math.random() * userStatusesItems.length)]
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
  // todo duplicated code hope that cypress will be able to use import to reuse this part of code
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
  getRole: () => {
    return (
      cy
        .php('App\\Models\\Role::inRandomOrder()->first()')
        // @ts-expect-error variable undefined
        .then((role: Role) => role)
    )
  },
  getUser: () => {
    // @ts-expect-error variable undefined
    return cy.php('App\\Models\\User::first()').then((state: State) => {
      return {
        id: state.id,
        name: state.name,
        code: state.code,
        country_id: state.country.id,
        country: state.country.name,
      } as CyState
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
