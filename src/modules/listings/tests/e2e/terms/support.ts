import { faker } from '@faker-js/faker'

interface CyListingTerm {
  id: string
  name: string
  description: string
}

const intercepts = () => {
  cy.intercept('POST', '/api/public?operation=GetListingTerms').as('queryGetListingTerms')
  cy.intercept('POST', '/api?operation=listingTermUpdate').as('mutationListingTermUpdate')
}

const listingTerms = {
  truncate: () => {
    cy.php("DB::table('listing_terms')->delete()")
  },
  generateListingTerm: (): { name: string; description: string } => {
    return {
      name: faker.lorem.word(10),
      description: faker.lorem.sentence(),
    }
  },
  navigation: {
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/listings/terms')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Listing Terms').click()
      }
      cy.wait('@queryGetListingTerms')
      cy.url().should('eq', `${Cypress.config().baseUrl}/listings/terms`)
    },
    update: (listingTerm: CyListingTerm) => {
      listingTerms.navigation.show()

      cy.getBySel('datatable').find('tbody tr').contains(listingTerm.name).parents('tr').find('[data-test="update"]').click()
      cy.url().should('eq', `${Cypress.config().baseUrl}/listings/terms/${listingTerm.id}/update`)
      cy.wait('@queryGetListingTerms')
    },
  },
}

export { intercepts, listingTerms, CyListingTerm }
