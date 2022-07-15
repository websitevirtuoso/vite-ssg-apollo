import { intercepts, categories } from './support'
import { categoryUpsert } from './graphql/mutations/categoryUpsert'

describe('Update', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    cy.login()
    intercepts()
    categories.truncate()

    const category = categories.generateCategory()
    cy.gqlRequest('/api', categoryUpsert, category, 'Create Category Record')
    categories.navigation.update(category)
  })
  afterEach(() => {
    categories.truncate()
  })

  it('should display fields required', () => {
    cy.getBySel('category.title').find('input').clear()
    cy.getBySel('category.submit').should('be.disabled')

    cy.getBySel('category.title').errorValidation('Title is a required field')
  })

  it('should update', () => {
    const category = categories.generateCategory()
    cy.getBySel('category.title').find('input').clear().type(category.title)
    cy.getBySel('category.submit').click()

    cy.wait('@mutationCategoryUpsert').then(({ response }) => {
      // @ts-expect-error unknown variable
      expect(response.body.data.categoryUpsert).to.exist
    })

    cy.notification('Record has been updated')
    cy.url().should('eq', `${Cypress.config().baseUrl}/categories`)
    cy.wait('@queryGetCategories')
    cy.getBySel('datatable').get('tbody tr').should('contain', category.title)
  })
})
