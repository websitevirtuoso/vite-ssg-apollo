import { intercepts, posts } from './support'

describe('Posts Navigation and Datatable', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('navigate from dashboard, datatable and to create form', () => {
    posts.navigation.create(false)
  })

  it('should see list of posts', () => {
    cy.create('App\\Models\\Post')
    posts.navigation.show(false)

    cy.getDataTableHeaderLength(8)
    cy.getDataTableBodyLength(8)
  })
})
