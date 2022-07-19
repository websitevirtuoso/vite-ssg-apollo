/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Command to select DOM element by data-test attribute.
     * @example cy.getBySel('greeting')
     */
    getBySel(dataTestAttribute: string): Chainable<Element>
    /**
     * Command to select all DOM elements by data-test attribute.
     * @example cy.getBySel('greeting')
     */
    getBySelLike(dataTestPrefixAttribute: string): Chainable<Element>
    errorValidation(message: string): Chainable<Element>
    toggleSideMenu(show: boolean): void
    toggleElement(dataTestAttribute: string, show: boolean): void

    getDataTableHeaderLength(columns: number): Chainable<Element>
    getDataTableBodyLength(columns: number): Chainable<Element>
    vSelect(message: string): Chainable<Element>
    notification(message: string): void

    /**
     * Make HTTP request to the app.
     * @example
     * cy.gqlRequest('/api', 'gql query/mutation as a string', {}, 'Create Alert');
     */
    gqlRequest(schemaUrl: string, gqlQuery: string, gqlVariables: object, message: string): void
    //laravel cypress commands
    /**
     * Log in the user with the given attributes, or create a new user and then log them in.
     *
     * @example
     * cy.login()
     * cy.login({ id: 1 })
     */
    login(attributes?: object): Chainable<Element>

    /**
     * Log out the current user.
     *
     * @example
     * cy.logout()
     */
    logout(): Chainable<Element>

    /**
     * Fetch the currently authenticated user.
     *
     * @example
     * cy.currentUser()
     */
    currentUser(): Chainable<Element>

    /**
     * Fetch a CSRF token from the server.
     *
     * @example
     * cy.logout()
     */
    csrfToken(): Chainable<Element>

    /**
     * Fetch a fresh list of URI routes from the server.
     *
     * @example
     * cy.logout()
     */
    refreshRoutes(): Chainable<Element>

    /**
     * Create and persist a new Eloquent record using Laravel model factories.
     *
     * @example
     * cy.create('App\\User');
     * cy.create('App\\User', 2);
     * cy.create('App\\User', 2, { active: false });
     * cy.create({ model: 'App\\User', state: ['guest'], relations: ['profile'], count: 2 }
     */
    create(model: string, count = 1, attributes = {}, load = [], state = []): Chainable<Element>
    /**
     * Refresh the database state using Laravel's migrate:fresh command.
     *
     * @example
     * cy.refreshDatabase()
     * cy.refreshDatabase({ '--drop-views': true }
     */
    refreshDatabase(options?: object): Chainable<Element>

    /**
     * Run Artisan's db:seed command.
     *
     * @example
     * cy.seed()
     * cy.seed('PlansTableSeeder')
     */
    seed(seederClass?: string): Chainable<Element>

    /**
     * Run an Artisan command.
     *
     * @example
     * cy.artisan()
     */
    artisan(command: string, parameters?: object, options?: object): Chainable<Element>

    /**
     * Execute arbitrary PHP on the server.
     *
     * @example
     * cy.php('2 + 2')
     * cy.php('App\\User::count()')
     */
    php(command: string): Chainable<Element>
  }
}
