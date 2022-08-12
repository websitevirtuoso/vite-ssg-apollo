import { intercepts, promos } from './support'

describe('Create', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
    promos.navigation.create()
  })

  it('should display required fields', () => {
    cy.getBySel('promo.submit').click()
    cy.getBySel('promo.submit').should('be.disabled')

    cy.getBySel('promo.code').errorValidation('Code is a required field')
    cy.getBySel('promo.discount').errorValidation('Discount is a required field')
    cy.getBySel('promo.use').errorValidation('Use max times is a required field')
    cy.getBySel('promo.expire_at.block').errorValidation('Expire at is a required field')
    cy.getBySel('promo.short_description').errorValidation('Short description is a required field')
    cy.getBySel('promo.description').errorValidation('Description is a required field')

    cy.getBySel('promo.discount').find('input').type('101')
    cy.getBySel('promo.discount').errorValidation('Discount must be less than or equal to 100')

    cy.getBySel('promo.description').findEditorField().type('test')
    cy.getBySel('promo.description').errorValidation('Description must be at least 20 characters')
  })

  it('should create', () => {
    const promo = promos.generatePromo()
    cy.getBySel('promo.code').type(promo.code)
    cy.getBySel('promo.discount').type(String(promo.discount))
    cy.getBySel('promo.use').type(String(promo.use))
    cy.getBySel('promo.expire_at').type(promo.expire_at)
    cy.getBySel('promo.short_description').type(promo.short_description)
    cy.getBySel('promo.description').findEditorField().type(promo.description)
    cy.getBySel('promo.submit').click()

    cy.wait('@mutationPromoUpsert').then(({ response }) => {
      // @ts-expect-error undefined variable
      expect(response.body.data.promoUpsert).to.exist
      // @ts-expect-error undefined variable
      expect(response.body.data.promoUpsert.id).to.exist
    })

    cy.notification('Record has been created')
    cy.url().should('eq', `${Cypress.config().baseUrl}/promotions`)
    cy.wait('@queryGetPromotions')

    cy.toggleElement('btn.filter', true)
    // filter by code
    cy.getBySel('filter.promo.code')
      .find('input')
      .clear()
      .type(`${promo.code}{enter}`)
      .then(() => {
        cy.wait('@queryGetPromotions')

        cy.getBySel('datatable')
          .get('tbody tr')
          .should('contain', promo.code)
          .and('contain', promo.discount)
          .and('contain', promo.use)
          .and('contain', promo.short_description)
      })
  })
})
