import { intercepts, listings, CyFactoryListing } from './support'
import { City } from '@/modules/regions/types'
import { getCity } from '@/composables/useCypressHelper'

describe('Update', () => {
  before(() => {
    cy.refreshDatabase()
    cy.seed('CypressDatabaseSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
  })

  it('should display required fields', () => {
    // @ts-expect-error variable undefined
    cy.create('App\\Models\\Listing').then((listing: CyFactoryListing) => {
      listings.navigation.update(listing)

      cy.getBySel('region.country').should('be.visible')
      cy.getBySel('region.state').should('be.visible')
      cy.getBySel('region.city').should('be.visible')

      cy.getBySel('region.country')
        .find('.v-select__selection-text')
        .then(($el) => {
          const selectedCountry = $el[0].textContent

          // to make sure that gql query works we need to get another country to refetch items
          // @ts-expect-error city unknown type
          getCity(selectedCountry).then((city: City) => {
            cy.getBySel('region.country').vSelect(city.state.country.name)
            cy.wait('@queryGetStates')
            cy.getBySel('region.state').should('exist')
            cy.getBySel('region.state').errorValidation('State is a required field')

            cy.getBySel('region.state').vSelect(city.state.name)
            cy.wait('@queryGetCities')
            cy.getBySel('region.city').should('exist')
            cy.getBySel('region.city').errorValidation('City is a required field')
          })
        })

      // clear all fields
      cy.getBySel('listing.price').find('input').clear()
      cy.getBySel('listing.square_feet').find('input').clear()
      cy.getBySel('listing.description').type('{selectall}{backspace}')
      cy.getBySel('region.address').find('input').clear()
      cy.getBySel('region.postal_code').find('input').clear()
      cy.getBySel('listing.expire_at').clear()

      cy.getBySel('listing.price').errorValidation("Price must be a 'number' type")
      cy.getBySel('listing.square_feet').errorValidation("Square feet must be a 'number' type")

      cy.getBySel('listing.expire_at.block').errorValidation('Expire at is a required field')
      cy.getBySel('listing.description').errorValidation('Description is a required field')
      cy.getBySel('region.address').errorValidation('Address is a required field')
      cy.getBySel('region.postal_code').errorValidation('Postal Code is a required field')
    })
  })

  it('should update', () => {
    // @ts-expect-error user unknown type
    cy.create('App\\Models\\Listing').then((listing: CyFactoryListing) => {
      listings.navigation.update(listing)

      cy.getBySel('region.country').should('be.visible')
      cy.getBySel('region.state').should('be.visible')
      cy.getBySel('region.city').should('be.visible')

      // todo extend user to check ability select another user
      // select user
      // cy.getBySel('listing.user').type(listing.user.id)
      // cy.wait('@queryGetUsers')
      // cy.getBySel('listing.user').vSelect(listing.user.id)
      // end select user

      // @ts-expect-error unknown type
      listings.generateListing().then((listing: CyFactoryListing) => {
        cy.getBySel('listing.price').find('input').clear().type(listing.price)
        cy.getBySel('listing.deposit').find('input').clear().type(listing.deposit)
        cy.getBySel('listing.square_feet').find('input').clear().type(listing.square_feet)
        cy.getBySel('listing.status').vSelect(listing.status)
        cy.getBySel('listing.bathrooms').vSelect(String(listing.bathrooms))
        cy.getBySel('listing.bedrooms').vSelect(String(listing.bedrooms))
        cy.getBySel('listing.terms').vSelect(listing.term.description)
        cy.getBySel('listing.available_at').clear().type(listing.available_at)
        cy.getBySel('listing.expire_at').clear().type(listing.expire_at)

        // select listing type
        cy.getBySel('listing.type').contains(listing.type.description).click()

        cy.getBySel('listing.description').click().type(`{selectall}{backspace}${listing.description}`)

        // set region
        cy.getBySel('region.address').find('input').clear().type(listing.address)
        cy.getBySel('region.postal_code').find('input').clear().type(listing.postal_code)

        cy.getBySel('region.country').vSelect(listing.city.state.country.name)
        cy.wait('@queryGetStates')
        cy.getBySel('region.state').vSelect(listing.city.state.name)
        cy.wait('@queryGetCities')

        // v-autocomplete
        cy.getBySel('region.city').find('input').clear().type(listing.city.name)
        cy.wait('@queryGetCities')
        cy.getBySel('region.city').vSelect(listing.city.name)
        // end region section

        // todo write tests to edit media, delete media, edit media or write component testing
        // attach media to listing
        cy.getBySel('listing.media').screenshot('default media state')

        cy.getBySel('listing.media.input').selectFile(listing.media[0], { force: true })
        cy.getBySel('listing.media.drop-zone').selectFile(listing.media[1], { action: 'drag-drop' })

        cy.getBySel('listing.media.card').should('have.length', 2)
        cy.getBySel('listing.media').screenshot('listing media with 2 images')
        // end media section

        const pets = ['listing.pets.not-allow', 'listing.pets.cats', 'listing.pets.small-dogs', 'listing.pets.large-dogs']
        const randomPetOption = pets[Math.floor(Math.random() * pets.length)]
        cy.getBySel(randomPetOption).click()

        cy.getBySel('listing.submit').click()

        cy.wait('@mutationListingUpsert').then(({ response }) => {
          // @ts-expect-error undefined variable
          expect(response.body.data.listingUpsert).to.exist
          // @ts-expect-error undefined variable
          expect(response.body.data.listingUpsert.id).to.exist

          cy.notification('Record has been updated')
          // @ts-expect-error undefined variable
          cy.url().should('eq', `${Cypress.config().baseUrl}/listings/${response.body.data.listingUpsert.id}/view`)
          cy.wait('@queryGetListing')
        })
        // todo add assertions to check data on view page
      })
    })
  })
})
