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
      expire_at: dayjs().add(7, 'day').format('YYYY-MM-DD'),
      rules: {
        user_use_once: faker.datatype.boolean(),
      },
    }
  },
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
