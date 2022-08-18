import { faker } from '@faker-js/faker'
import { City } from '@/modules/regions/types'
import { Role } from '@/modules/auth/utils/types'
import { userStatuses } from '../../enums'

type CyUser = {
  first_name: string
  last_name: string
  email: string
  password: string
  phone: string[]
  role: {
    id: string
    display_name: string
  }
  status: string
  address: string
  postal_code: string
  city: City
}

const intercepts = () => {
  cy.intercept('POST', '/api?operation=GetUsers').as('queryGetUsers')
  cy.intercept('POST', '/api/public?operation=GetCities').as('queryGetCities')
  cy.intercept('POST', '/api/public?operation=GetStates').as('queryGetStates')
  cy.intercept('POST', '/api/public?operation=GetCountries').as('queryGetCountries')
  cy.intercept('POST', '/api?operation=GetRoles').as('queryGetRoles')
  cy.intercept('POST', '/api?operation=UserCreate').as('mutationUserCreate')
}

const users = {
  generateUser: (): CyUser => {
    // @ts-expect-error unknown type
    return users.getRole().then((role: Role) => {
      // @ts-expect-error unknown type
      return users.getCity().then((city: City) => {
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
  // todo duplicate code hope that cypress will be able to use import to reuse this part of code
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
        .php(`App\\Models\\Role::inRandomOrder()->first()`)
        // @ts-expect-error variable undefined
        .then((role: Role) => role)
    )
  },
  // generateCity: () => {
  //   return {
  //     name: faker.lorem.word(10),
  //   }
  // },
  // getCity: () => {
  //   return (
  //     cy
  //       .php(`App\\Models\\City::with('state')->inRandomOrder()->first()`)
  //       // @ts-expect-error variable undefined
  //       .then((city: City) => city)
  //   )
  // },
  // getState: () => {
  //   return (
  //     cy
  //       .php(`App\\Models\\State::with('country')->inRandomOrder()->first()`)
  //       // @ts-expect-error variable undefined
  //       .then((state: State) => state)
  //   )
  // },
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
    // update: () => {
    //   users.navigation.show()
    //   cy.getBySel('datatable').find('tbody tr').find('[data-test="update"]').first().click()
    //
    //   cy.php('App\\Models\\Promo::latest()->first()').then((promo) => {
    //     cy.url().should('eq', `${Cypress.config().baseUrl}/promotions/${promo.id}/update`)
    //   })
    //   cy.wait('@queryGetPromotions')
    // },
  },
}

export { intercepts, users, CyUser }
