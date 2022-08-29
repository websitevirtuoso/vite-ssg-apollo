import { CyListingTerm, intercepts, listingTerms } from './support'

describe('Update', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    listingTerms.truncate()
    cy.login()
  })

  it('should display required fields', () => {
    // @ts-expect-error listingTerm unknown type
    cy.create('App\\Models\\ListingTerm').then((listingTerm: CyListingTerm) => {
      listingTerms.navigation.update(listingTerm)

      cy.getBySel('listing_term.name').find('input').should('be.disabled')
      cy.getBySel('listing_term.description').find('textarea[name="description"]').clear()
      cy.getBySel('listing_term.submit').should('be.disabled')

      cy.getBySel('listing_term.description').errorValidation('Description is a required field')
    })
  })

  it('should update', () => {
    // @ts-expect-error listingTerm unknown type
    cy.create('App\\Models\\ListingTerm').then((listingTerm: CyListingTerm) => {
      listingTerms.navigation.update(listingTerm)

      const newListingTerm = listingTerms.generateListingTerm()
      cy.getBySel('listing_term.description').find('textarea[name="description"]').clear().type(newListingTerm.description)
      cy.getBySel('listing_term.submit').click()

      cy.wait('@mutationListingTermUpdate').then(({ response }) => {
        // @ts-expect-error undefined variable
        expect(response.body.data.listingTermUpdate).to.exist
        // @ts-expect-error undefined variable
        expect(response.body.data.listingTermUpdate.id).to.exist
      })

      cy.notification('Record has been updated')
      cy.url().should('eq', `${Cypress.config().baseUrl}/listings/terms`)
      cy.wait('@queryGetListingTerms')

      cy.getBySel('datatable').get('tbody tr').should('contain', listingTerm.name).and('contain', newListingTerm.description)
    })
  })
})
