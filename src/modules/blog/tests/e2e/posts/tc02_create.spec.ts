import { intercepts, posts } from './support'
import { Category } from '../../../types'

describe('Create', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
    cy.create('App\\Modules\\Categories\\Models\\Category')
    posts.navigation.create()
  })
  afterEach(() => {
    posts.truncate()
  })

  it('should display required fields', () => {
    cy.getBySel('post.submit').click()
    cy.getBySel('post.submit').should('be.disabled')

    cy.getBySel('post.title').errorValidation('Title is a required field')
    cy.getBySel('post.slug').errorValidation('Slug is a required field')
    cy.getBySel('post.status').errorValidation('Status is a required field')
    cy.getBySel('post.category').errorValidation('Category is a required field')
    cy.getBySel('post.content').errorValidation('Content is a required field')

    // open tab meta
    cy.getBySel('tab-meta').click()
    // check active tab
    cy.get('.v-window-item--active').find('.v-messages .v-messages__message').should('not.exist')
  })

  it('should create', () => {
    // @ts-expect-error category unknown type
    posts.getCategory().then((category: Category) => {
      const newPost = posts.generatePosts()
      cy.getBySel('post.title').type(newPost.title)
      cy.getBySel('post.slug').type(newPost.slug)
      cy.getBySel('post.status').vSelect(newPost.status)
      cy.getBySel('post.category').vSelect(category.title)
      cy.getBySel('post.content').findEditorField().type(newPost.content)
      cy.getBySel('post.submit').click()

      cy.wait('@mutationPostUpsert').then(({ response }) => {
        // @ts-expect-error undefined variable
        expect(response.body.data.postUpsert).to.exist
        // @ts-expect-error undefined variable
        expect(response.body.data.postUpsert.id).to.exist
      })

      cy.notification('Record has been created')
      cy.url().should('eq', `${Cypress.config().baseUrl}/posts`)
      cy.wait('@queryGetPosts')

      console.log(newPost)
      cy.getBySel('datatable')
        .get('tbody tr')
        .should('contain', newPost.title)
        .and('contain', newPost.slug)
        .and('contain', newPost.status)
        .and('contain', category.title)
    })
  })
})
