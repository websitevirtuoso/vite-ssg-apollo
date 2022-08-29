import { CyListingType, intercepts, listingTypes } from './support'

describe('Update', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    listingTypes.truncate()
    cy.login()
  })

  it('should display required fields', () => {
    // @ts-expect-error listingType unknown type
    cy.create('App\\Models\\ListingType').then((listingType: CyListingType) => {
      listingTypes.navigation.update(listingType)

      cy.getBySel('listing_type.name').find('input').should('be.disabled')
      cy.getBySel('listing_type.description').find('textarea[name="description"]').clear()
      cy.getBySel('listing_type.submit').should('be.disabled')

      cy.getBySel('listing_type.description').errorValidation('Description is a required field')
    })
  })

  it('should update', () => {
    // @ts-expect-error listingType unknown type
    cy.create('App\\Models\\ListingType').then((listingType: CyListingType) => {
      listingTypes.navigation.update(listingType)

      const newListingType = listingTypes.generateListingType()
      cy.getBySel('listing_type.description').find('textarea[name="description"]').clear().type(newListingType.description)
      cy.getBySel('listing_type.submit').click()

      cy.wait('@mutationListingTypeUpdate').then(({ response }) => {
        // @ts-expect-error undefined variable
        expect(response.body.data.listingTypeUpdate).to.exist
        // @ts-expect-error undefined variable
        expect(response.body.data.listingTypeUpdate.id).to.exist
      })

      cy.notification('Record has been updated')
      cy.url().should('eq', `${Cypress.config().baseUrl}/listings/types`)
      cy.wait('@queryGetListingTypes')

      cy.getBySel('datatable').get('tbody tr').should('contain', listingType.name).and('contain', newListingType.description)
    })
  })
})
