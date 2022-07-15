import { AUTH_TOKEN, AUTH_TOKEN_EXPIRE } from '../../src/modules/auth/utils/auth'

Cypress.Commands.add('getBySel', (selector: string): Cypress.Chainable => {
  return cy.get(`[data-test="${selector}"]`)
})

Cypress.Commands.add('getBySelLike', (selector: string): Cypress.Chainable => {
  return cy.get(`[data-test*="${selector}"]`)
})

// @ts-expect-error prevSubject unknown type
Cypress.Commands.add('errorValidation', { prevSubject: true }, (subject, message: string) => {
  return cy.wrap(subject).find('.v-input__details').contains(message)
})

Cypress.Commands.add('getDataTableHeaderLength', (columns: number) => {
  cy.log("should have length header's table")
  cy.get('[data-test="datatable"]').within(() => {
    return cy.get('thead tr th').should('have.length', columns)
  })
})

Cypress.Commands.add('getDataTableBodyLength', (columns: number) => {
  cy.log('should have at least one row')
  cy.get('[data-test="datatable"]').within(() => {
    cy.get('tbody tr:first td').should('have.length', columns)
  })
})

Cypress.Commands.add('vSelect', { prevSubject: true }, (subject, message: string) => {
  cy.wrap(subject).click()
  cy.get('div.v-menu').contains(message).click()
})

Cypress.Commands.add('notification', (message: string): void => {
  cy.get('[data-test="notification"]').contains(message).should('be.visible')
})

Cypress.Commands.add('login', () => {
  const query = `
    mutation {
      logIn(email: "${Cypress.env('userEmail')}", password: "${Cypress.env('userPassword')}") {
        access_token
        token_type
        expires_in
        user {
          id
          first_name
          last_name
          roles {
            id
            name
            permissions {
              id
              name
            }
          }
        }
      }
    }
  `
  cy.request({
    log: true,
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/api/public`,
    body: { query: query },
  }).then(
    ({
      body: {
        data: { logIn },
      },
    }) => {
      localStorage.setItem(AUTH_TOKEN, logIn.access_token)
      // get current time + add second and set this datetime into storage
      const t = new Date()
      t.setSeconds(t.getSeconds() + logIn.expires_in)
      localStorage.setItem(AUTH_TOKEN_EXPIRE, t.toISOString())
      localStorage.setItem('user', JSON.stringify(logIn.user))
    }
  )
})

Cypress.Commands.add('toggleSideMenu', (show: boolean) => {
  cy.get('[data-test="side-bar"]').then(($sideBar) => {
    if (show) {
      if (!$sideBar.hasClass('v-navigation-drawer--active')) {
        cy.get('[data-test="sidenav-toggle"]').click()
      }
    } else {
      if ($sideBar.hasClass('v-navigation-drawer--active')) {
        cy.get('[data-test="sidenav-toggle"]').click()
      }
    }
  })
})

/**
 * Make HTTP request to the app.
 * @example
 * cy.gqlRequest('/api/public', '/api/communication/alerts', 'Create Alert');
 */
Cypress.Commands.add(
  'gqlRequest',
  (schemaUrl = '/api', gqlQuery: string, gqlVariables: object, message: string): void => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(AUTH_TOKEN)

    cy.request({
      log: true,
      method: 'POST',
      url: `${Cypress.env('apiUrl')}${schemaUrl}`,
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
      body: {
        query: gqlQuery,
        variables: gqlVariables,
      },
    }).then(({ body: { data } }) => {
      cy.log(message)
      cy.log(data)
    })
  }
)
