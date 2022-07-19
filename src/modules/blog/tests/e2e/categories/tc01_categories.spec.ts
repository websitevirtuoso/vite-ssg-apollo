import { intercepts, categories } from './support'
import { categoryUpsert } from './graphql/mutations/categoryUpsert'

describe('Categories Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })

  beforeEach(() => {
    intercepts()
    categories.truncate()
    cy.login()
  })

  it('navigate from dashboard, datatable and to create form', () => {
    categories.navigation.create(false)
  })

  it('should see list of categories', () => {
    cy.gqlRequest('/api', categoryUpsert, categories.generateCategory(), 'Create Category Record')
    categories.navigation.show(false)

    cy.getDataTableHeaderLength(5)
    cy.getDataTableBodyLength(5)
  })
})
