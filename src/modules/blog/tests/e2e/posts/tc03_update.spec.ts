import { intercepts, posts, CyPost } from './support'
import { Category, Post } from '@/modules/blog/types'

const updatePost = (setOptionalFields = false, checkDatabaseValues = false) => {
  // @ts-expect-error post unknown type
  cy.create('App\\Models\\Post').then((post: CyPost) => {
    // @ts-expect-error category unknown type
    posts.getCategory().then((category: Category) => {
      posts.navigation.update(post)
      cy.wait('@queryGetCategories')

      const newPost = posts.generatePosts()

      cy.getBySel('post.title').find('input').clear().type(newPost.title)
      cy.getBySel('post.status').vSelect(newPost.status)
      cy.getBySel('post.category').vSelect(category.title)
      cy.getBySel('post.content').findEditorField().type(`{selectall}{backspace}${newPost.content}`)

      // set optional fields
      if (setOptionalFields) {
        // open tab meta
        cy.getBySel('tab-meta').click()

        cy.getBySel('post.meta_title').type(newPost.meta_title)
        cy.getBySel('post.meta_keyword').type(newPost.meta_keyword)
        cy.getBySel('post.meta_description').type(newPost.meta_description)
      }

      cy.getBySel('post.submit').click()

      cy.wait('@mutationPostUpsert').then(({ response }) => {
        // @ts-expect-error undefined variable
        expect(response.body.data.postUpsert).to.exist
        // @ts-expect-error undefined variable
        expect(response.body.data.postUpsert.id).to.exist
      })

      cy.notification('Record has been updated')
      cy.url().should('eq', `${Cypress.config().baseUrl}/posts`)
      cy.wait('@queryGetPosts')

      // need to reset filter in any case
      cy.toggleElement('btn.filter', true)
      cy.getBySel('filter.post.title').find('input').clear()
      cy.wait('@queryGetPosts')

      cy.getBySel('datatable')
        .get('tbody tr')
        .should('contain', newPost.title)
        .and('contain', post.slug)
        .and('contain', newPost.status)
        .and('contain', category.title)

      if (checkDatabaseValues) {
        cy.php(`App\\Models\\Post::first()`)
          // @ts-expect-error variable undefined
          .then((postDB: Post) => {
            expect(postDB.title).to.equal(newPost.title)
            expect(postDB.slug).to.equal(post.slug)
            expect(postDB.status).to.equal(newPost.status)
            expect(postDB.meta_title).to.equal(newPost.meta_title)
            expect(postDB.meta_keyword).to.equal(newPost.meta_keyword)
            expect(postDB.meta_description).to.equal(newPost.meta_description)
          })
      }
    })
  })
}

describe('Update', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
    cy.create('App\\Modules\\Categories\\Models\\Category')
  })
  afterEach(() => {
    posts.truncate()
  })

  it('should display required fields', () => {
    // @ts-expect-error post unknown type
    cy.create('App\\Models\\Post').then((post: CyPost) => {
      posts.navigation.update(post)
      cy.wait('@queryGetCategories')

      cy.getBySel('post.title').find('input').clear()
      cy.getBySel('post.slug').find('input').should('be.disabled')
      cy.getBySel('post.submit').should('be.disabled')

      cy.getBySel('post.title').errorValidation('Title is a required field')
    })
  })

  it('should update', () => {
    updatePost()
  })

  it('should update with optional fields', () => {
    updatePost(true, true)
  })
})
