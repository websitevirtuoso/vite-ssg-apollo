import { faker } from '@faker-js/faker'

interface CyListingType {
  id: string
  name: string
  description: string
}

const intercepts = () => {
  cy.intercept('POST', '/api/public?operation=GetListingTypes').as('queryGetListingTypes')
  cy.intercept('POST', '/api?operation=listingTypeUpdate').as('mutationListingTypeUpdate')
}

const listingTypes = {
  truncate: () => {
    cy.php("DB::table('listing_types')->delete()")
  },
  generateListingType: (): { name: string; description: string } => {
    return {
      name: faker.lorem.word(10),
      description: faker.lorem.sentence(),
    }
  },
  navigation: {
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/listings/types')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Listing Types').click()
      }
      cy.wait('@queryGetListingTypes')
      cy.url().should('eq', `${Cypress.config().baseUrl}/listings/types`)
    },
    update: (listingTerm: CyListingType) => {
      listingTypes.navigation.show()

      cy.getBySel('datatable')
        .find('tbody tr')
        .contains(listingTerm.name)
        .parents('tr')
        .find('[data-test="update"]')
        .click()
      cy.url().should('eq', `${Cypress.config().baseUrl}/listings/types/${listingTerm.id}/update`)
      cy.wait('@queryGetListingTypes')
    },
  },
}

export { intercepts, listingTypes, CyListingType }
