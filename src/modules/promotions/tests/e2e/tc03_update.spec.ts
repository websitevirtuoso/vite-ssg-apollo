import { intercepts, promos } from './support'

describe('Update', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.create('App\\Models\\Promo')
    cy.login()
    promos.navigation.update()
  })
  afterEach(() => {
    promos.truncate()
  })

  it('should display required fields', () => {
    cy.getBySel('promo.code').find('input').clear()
    cy.getBySel('promo.discount').find('input').clear()
    cy.getBySel('promo.use').find('input').clear()
    cy.getBySel('promo.expire_at').clear()
    cy.getBySel('promo.short_description').find('input').clear()
    cy.getBySel('promo.description').findEditorField().type('{selectall}{backspace}')
    cy.getBySel('promo.submit').should('be.disabled')

    cy.getBySel('promo.code').errorValidation('Code is a required field')
    cy.getBySel('promo.discount').errorValidation('Discount is a required field')
    cy.getBySel('promo.use').errorValidation('Use max times is a required field')
    cy.getBySel('promo.expire_at.block').errorValidation('Expire at is a required field')
    cy.getBySel('promo.short_description').errorValidation('Short description is a required field')
    cy.getBySel('promo.description').errorValidation('Description must be at least 20 characters')

    cy.getBySel('promo.discount').find('input').type('101')
    cy.getBySel('promo.discount').errorValidation('Discount must be less than or equal to 100')
  })

  it('should update', () => {
    const newPromo = promos.generatePromo()

    cy.getBySel('promo.code').find('input').clear().type(newPromo.code)
    cy.getBySel('promo.discount').find('input').clear().type(String(newPromo.discount))
    cy.getBySel('promo.use').find('input').clear().type(String(newPromo.use))
    cy.getBySel('promo.expire_at').clear().type(newPromo.expire_at)
    cy.getBySel('promo.short_description').find('input').clear().type(newPromo.short_description)
    cy.getBySel('promo.description').findEditorField().type(`{selectall}{backspace}${newPromo.description}`)
    cy.getBySel('promo.submit').click()

    cy.wait('@mutationPromoUpsert').then(({ response }) => {
      // @ts-expect-error undefined variable
      expect(response.body.data.promoUpsert).to.exist
      // @ts-expect-error undefined variable
      expect(response.body.data.promoUpsert.id).to.exist
    })

    cy.notification('Record has been updated')
    cy.url().should('eq', `${Cypress.config().baseUrl}/promotions`)
    cy.wait('@queryGetPromotions')

    cy.getBySel('datatable')
      .get('tbody tr')
      .should('contain', newPromo.code.toUpperCase())
      .and('contain', newPromo.discount)
      .and('contain', newPromo.use)
      .and('contain', newPromo.short_description)
  })
})
