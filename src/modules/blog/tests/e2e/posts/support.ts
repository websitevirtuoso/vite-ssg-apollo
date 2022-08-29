import { faker } from '@faker-js/faker'
import { Category, PostInput } from '../../../types'
import { Post_Status } from '../../../../../plugins/apollo/schemaTypesGenerated'

interface CyPost extends PostInput {
  id: string | undefined
}

const intercepts = () => {
  cy.intercept('POST', '/api/public?operation=GetPosts').as('queryGetPosts')
  cy.intercept('POST', '/api/public?operation=GetCategories').as('queryGetCategories')
  cy.intercept('POST', '/api?operation=PostUpsert').as('mutationPostUpsert')
}

const posts = {
  truncate: () => {
    cy.php("DB::table('categories')->delete(); DB::table('posts')->delete();")
  },
  generatePosts: () => {
    const postStatuses = Object.values(Post_Status)
    const randomStatus = postStatuses[Math.floor(Math.random() * postStatuses.length)]
    return {
      title: faker.lorem.word(10),
      slug: faker.lorem.slug(),
      status: randomStatus,
      content: faker.lorem.sentences(),
      meta_title: faker.lorem.word(10),
      meta_keyword: faker.lorem.words(4),
      meta_description: faker.lorem.sentence(),
    }
  },
  getCategory: () => {
    return (
      cy
        .php('App\\Modules\\Categories\\Models\\Category::first()')
        // @ts-expect-error variable undefined
        .then((category: Category) => category)
    )
  },
  navigation: {
    create: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/posts/create')
      } else {
        posts.navigation.show()
        cy.getBySel('btn.create').should('have.length', 1).click()
      }
      cy.wait('@queryGetCategories')
      cy.url().should('eq', `${Cypress.config().baseUrl}/posts/create`)
    },
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/posts')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Content').click()
        cy.getBySel('Posts').click()
      }
      cy.wait('@queryGetPosts')
      cy.url().should('eq', `${Cypress.config().baseUrl}/posts`)
    },
    update: (post: CyPost) => {
      posts.navigation.show()

      cy.toggleElement('btn.filter', true)

      // filter by title
      cy.getBySel('filter.post.title')
        .find('input')
        .clear()
        .type(post.title)
        .then(() => {
          cy.wait('@queryGetPosts')

          cy.getBySel('datatable').find('tbody tr').contains(post.title).parents('tr').find('[data-test="update"]').click()
          cy.url().should('eq', `${Cypress.config().baseUrl}/posts/${post.id}/update`)
          cy.wait('@queryGetPosts')
        })
    },
  },
}

export { intercepts, posts, CyPost }
