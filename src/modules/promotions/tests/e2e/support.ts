import dayjs from 'dayjs'
import { faker } from '@faker-js/faker'

type CyPromo = {
  code: string
  discount: number
  use: number
  short_description: string
  description: string
  expire_at: string
  rules: {
    user_use_once: boolean
  }
}

const intercepts = () => {
  cy.intercept('POST', '/api?operation=GetPromotions').as('queryGetPromotions')
  cy.intercept('POST', '/api?operation=PromoUpsert').as('mutationPromoUpsert')
}

const promos = {
  truncate: () => {
    cy.php("DB::table('promos')->delete()")
  },
  generatePromo: (): CyPromo => {
    return {
      code: faker.lorem.word(5),
      discount: faker.datatype.number({ min: 1, max: 100 }),
      use: faker.datatype.number({ min: 1, max: 1000 }),
      short_description: faker.lorem.sentence(),
      description: faker.lorem.sentences(),
      expire_at: dayjs().format('YYYY-MM-DD'),
      rules: {
        user_use_once: faker.datatype.boolean(),
      },
    }
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
        cy.visit('/promotions/create')
      } else {
        promos.navigation.show()
        cy.getBySel('btn.create').should('have.length', 1).click()
      }
      cy.url().should('eq', `${Cypress.config().baseUrl}/promotions/create`)
    },
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/promotions')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Promotions').click()
      }
      cy.wait('@queryGetPromotions')
      cy.url().should('eq', `${Cypress.config().baseUrl}/promotions`)
    },
    update: () => {
      promos.navigation.show()
      cy.getBySel('datatable').find('tbody tr').find('[data-test="update"]').first().click()

      cy.php('App\\Models\\Promo::latest()->first()').then((promo) => {
        cy.url().should('eq', `${Cypress.config().baseUrl}/promotions/${promo.id}/update`)
      })
      cy.wait('@queryGetPromotions')
    },
  },
}

export { intercepts, promos, CyPromo }
