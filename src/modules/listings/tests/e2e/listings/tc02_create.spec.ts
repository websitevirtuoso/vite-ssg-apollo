import { intercepts, listings, CyFactoryListing } from './support'
import { City } from '@/modules/regions/types'
import { getCity } from '@/composables/useCypressHelper'

describe('Create', () => {
  before(() => {
    cy.refreshDatabase()
    listings.truncate()
    cy.seed('CypressDatabaseSeeder')
    cy.seed('ListingTermTableSeeder')
    cy.seed('ListingTypeTableSeeder')
  })
  beforeEach(() => {
    intercepts()
    cy.login()
    listings.navigation.create()
  })

  it('should display required fields', () => {
    cy.getBySel('listing.submit').should('be.disabled')

    cy.getBySel('listing.generate.required').should('not.exist')
    cy.getBySel('listing.generate.description').click()
    cy.getBySel('listing.generate.required').should('exist').should('be.visible')
    // select user
    cy.getBySel('listing.user').type('1')
    cy.wait('@queryGetUsers')
    cy.getBySel('listing.user').vSelect('1')
    // end select user
    cy.getBySel('listing.submit').should('not.be.disabled').click()

    cy.getBySel('region.state').should('not.exist')
    cy.getBySel('region.city').should('not.exist')

    cy.getBySel('listing.price').errorValidation('Price is a required field')
    cy.getBySel('listing.square_feet').errorValidation('Square feet is a required field')
    cy.getBySel('listing.bedrooms').errorValidation('Bedrooms is a required field')
    cy.getBySel('listing.bathrooms').errorValidation('Bathrooms is a required field')
    cy.getBySel('listing.expire_at.block').errorValidation('Expire at is a required field')

    const pets = ['listing.pets.not-allow', 'listing.pets.cats', 'listing.pets.small-dogs', 'listing.pets.large-dogs']
    pets.map((selector) => {
      cy.getBySel(selector).errorValidation('Pets is a required field')
    })
    cy.getBySel('listing.description').errorValidation('Description is a required field')
    cy.getBySel('listing.types').errorValidation('Property Type is a required field')
    cy.getBySel('region.address').errorValidation('Address is a required field')
    cy.getBySel('region.postal_code').errorValidation('Postal Code is a required field')
    cy.getBySel('region.country').errorValidation('Country is a required field')

    // @ts-expect-error unknown type
    getCity().then((city: City) => {
      cy.getBySel('region.country').vSelect(city.state.country.name)
      cy.wait('@queryGetStates')
      cy.getBySel('region.state').should('exist')
      cy.getBySel('region.state').errorValidation('State is a required field')
      // fill state
      cy.getBySel('region.state').vSelect(city.state.name)
      cy.wait('@queryGetCities')
      cy.getBySel('region.city').should('exist')
      cy.getBySel('region.city').errorValidation('City is a required field')
      // fill city
      cy.getBySel('region.city').type(city.name)
      cy.wait('@queryGetCities')
      cy.getBySel('region.city').vSelect(city.name)
    })
  })

  it('should create', () => {
    // @ts-expect-error unknown type
    listings.generateListing().then((listing: CyFactoryListing) => {
      // select user
      cy.getBySel('listing.user').type(listing.user.id)
      cy.wait('@queryGetUsers')
      cy.getBySel('listing.user').vSelect(listing.user.id)
      // end select user

      cy.getBySel('listing.price').type(listing.price)
      cy.getBySel('listing.deposit').type(listing.deposit)
      cy.getBySel('listing.square_feet').type(listing.square_feet)
      cy.getBySel('listing.status').vSelect(listing.status)
      cy.getBySel('listing.bathrooms').vSelect(String(listing.bathrooms))
      cy.getBySel('listing.bedrooms').vSelect(String(listing.bedrooms))
      cy.getBySel('listing.terms').vSelect(listing.term.description)
      cy.getBySel('listing.available_at').type(listing.available_at)
      cy.getBySel('listing.expire_at').type(listing.expire_at)

      // select listing type
      cy.getBySel('listing.type').contains(listing.type.description).click()

      cy.getBySel('listing.description').click().type(listing.description)

      // set region
      cy.getBySel('region.address').type(listing.address)
      cy.getBySel('region.postal_code').type(listing.postal_code)

      cy.getBySel('region.country').vSelect(listing.city.state.country.name)
      cy.wait('@queryGetStates')
      cy.getBySel('region.state').vSelect(listing.city.state.name)
      cy.wait('@queryGetCities')

      // v-autocomplete
      cy.getBySel('region.city').type(listing.city.name)
      cy.wait('@queryGetCities')
      cy.getBySel('region.city').vSelect(listing.city.name)
      // end region section

      // attach media to listing
      cy.getBySel('listing.media').screenshot('default media state')

      cy.getBySel('listing.media.input').selectFile(listing.media[0], { force: true })
      cy.getBySel('listing.media.drop-zone').selectFile(listing.media[1], { action: 'drag-drop' })

      cy.getBySel('listing.media.card').should('have.length', 2)
      cy.getBySel('listing.media').screenshot('listing media with 2 images')
      // end media section

      // to select pets we need to get random selector
      const pets = ['listing.pets.not-allow', 'listing.pets.cats', 'listing.pets.small-dogs', 'listing.pets.large-dogs']
      const randomPetOption = pets[Math.floor(Math.random() * pets.length)]
      cy.getBySel(randomPetOption).click()

      cy.getBySel('listing.submit').click()

      cy.wait('@mutationListingUpsert').then(({ response }) => {
        // @ts-expect-error undefined variable
        expect(response.body.data.listingUpsert).to.exist
        // @ts-expect-error undefined variable
        expect(response.body.data.listingUpsert.id).to.exist

        cy.notification('Record has been created')
        // @ts-expect-error undefined variable
        cy.url().should('eq', `${Cypress.config().baseUrl}/listings/${response.body.data.listingUpsert.id}/view`)
        cy.wait('@queryGetListing')
      })
      // todo add assertions to check data on view page
    })
  })
})
