import { intercepts, categories } from './support'

describe('Create', () => {
  beforeEach(() => {
    cy.login()
    intercepts()
    categories.navigation.create()
  })
  afterEach(() => {
    categories.truncate()
  })

  it('should display required fields', () => {
    cy.getBySel('category.submit').click()

    cy.getBySel('category.title').errorValidation('Title is a required field')
  })

  it('should create', () => {
    const category = categories.generateCategory()
    cy.getBySel('category.title').type(category.title)
    cy.getBySel('category.submit').click()

    // check that Request been made
    cy.wait('@mutationCategoryUpsert').then(({ response }) => {
      // @ts-expect-error unknown variable
      expect(response.body.data.categoryUpsert).to.exist
    })

    cy.notification('Record has been created')
    cy.url().should('eq', `${Cypress.config().baseUrl}/categories`)
    cy.getBySel('datatable').get('tbody tr').should('contain', category.title)
  })
})
