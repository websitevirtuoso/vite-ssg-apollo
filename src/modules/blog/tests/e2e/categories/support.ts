import { faker } from '@faker-js/faker'

type CyCategory = {
  title: string
}

const intercepts = () => {
  cy.intercept('POST', '/api/public?operation=GetCategories').as('queryGetCategories')
  cy.intercept('POST', '/api?operation=CategoryUpsert').as('mutationCategoryUpsert')
}

const categories = {
  truncate: () => {
    cy.php("DB::table('categories')->delete()")
  },
  generateCategory: (): CyCategory => {
    return {
      title: faker.lorem.sentence(),
    }
  },
  navigation: {
    create: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/categories/create')
      } else {
        categories.navigation.show()
        cy.getBySel('btn.create').should('have.length', 1).click()
      }
      cy.url().should('eq', `${Cypress.config().baseUrl}/categories/create`)
    },
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/categories')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Content').click()
        cy.getBySel('Categories').click()
      }
      cy.wait('@queryGetCategories')
      cy.url().should('eq', `${Cypress.config().baseUrl}/categories`)
    },
    update: (category: CyCategory) => {
      categories.navigation.show()
      cy.getBySel('datatable').find('tbody tr').contains(category.title).parents('tr').find('[data-test="update"]').click()

      cy.php('App\\Modules\\Categories\\Models\\Category::latest()->first()').then((category) => {
        cy.url().should('eq', `${Cypress.config().baseUrl}/categories/${category.id}/update`)
      })
      cy.wait('@queryGetCategories')
    },
  },
}

export { intercepts, categories }
