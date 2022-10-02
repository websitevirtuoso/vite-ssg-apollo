import { faker } from '@faker-js/faker'
import { City } from '@/modules/regions/types'
import { Listing_Pets, Listing_Status, Users, ListingTerms, ListingTypes } from '@/plugins/apollo/schemaTypesGenerated'
import { bathroomItems, bedroomItems } from '@/modules/listings/helpers/listing'
import dayjs from 'dayjs'
import { getUser, getCity, getListingTerms, getListingTypes } from '@/composables/useCypressHelper'

interface CyFactoryListing {
  id: string
  price: string
  deposit: string
  status: Listing_Status
  description: string
  bedrooms: number
  bathrooms: number
  square_feet: string
  expire_at: string
  available_at: string
  pets: Array<Listing_Pets>
  user: Users
  term: ListingTerms
  type: ListingTypes

  address: string
  postal_code: string
  city: City
  media: string[]
}

const intercepts = () => {
  cy.intercept('POST', '/api/public?operation=GetListing').as('queryGetListing')
  cy.intercept('POST', '/api/public?operation=GetListings').as('queryGetListings')
  cy.intercept('POST', '/api/public?operation=GetListingTypes').as('queryGetListingTypes')
  cy.intercept('POST', '/api/public?operation=GetListingTerms').as('queryGetListingTerms')
  cy.intercept('POST', '/api/public?operation=GetListingFeatures').as('queryGetListingFeatures')
  cy.intercept('POST', '/api?operation=GetUsers').as('queryGetUsers')
  cy.intercept('POST', '/api?operation=ListingUpsert').as('mutationListingUpsert')
  // region queries
  cy.intercept('POST', '/api/public?operation=GetCities').as('queryGetCities')
  cy.intercept('POST', '/api/public?operation=GetStates').as('queryGetStates')
  cy.intercept('POST', '/api/public?operation=GetCountries').as('queryGetCountries')
}

const listings = {
  generateListing: (): CyFactoryListing => {
    // @ts-expect-error unknown type
    return getUser().then((user: User) => {
      // @ts-expect-error unknown type
      return getCity().then((city: City) => {
        // @ts-expect-error unknown type
        return getListingTerms().then((listingTerm: ListingTerms) => {
          // @ts-expect-error unknown type
          return getListingTypes().then((listingType: ListingTypes) => {
            const listingStatuses = Object.values(Listing_Status)
            const randomListingStatus = listingStatuses[Math.floor(Math.random() * listingStatuses.length)]
            const randomBathroom = bathroomItems[Math.floor(Math.random() * bathroomItems.length)]
            // get randomBedroom
            const bedroomItemsNormalized = bedroomItems.map((bedroom) => bedroom.title)
            const randomBedroom = bedroomItemsNormalized[Math.floor(Math.random() * bedroomItemsNormalized.length)]

            return {
              price: faker.datatype.number({ min: 10, max: 9999 }),
              deposit: faker.datatype.number({ min: 10, max: 9999 }),
              square_feet: faker.datatype.number({ min: 10, max: 9999 }),
              status: randomListingStatus,
              description: faker.lorem.sentence(),
              bathrooms: randomBathroom,
              bedrooms: randomBedroom,
              available_at: dayjs().format('YYYY-MM-DD'),
              expire_at: dayjs().add(7, 'day').format('YYYY-MM-DD'),

              address: faker.address.streetAddress(),
              postal_code: faker.address.zipCode('### ###'),
              city: city,
              user: user,
              term: listingTerm,
              type: listingType,
              media: [
                'cypress/fixtures/listing-media/house1.webp',
                'cypress/fixtures/listing-media/house2.webp',
                'cypress/fixtures/listing-media/house3.webp',
                'cypress/fixtures/listing-media/house4.webp',
              ],
            }
          })
        })
      })
    })
  },
  truncate: () => {
    cy.php("DB::table('listing_medias')->delete(); DB::table('listings')->delete();")
  },
  navigation: {
    create: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/listing/create')
      } else {
        listings.navigation.show()
        cy.getBySel('btn.create').should('have.length', 1).click()
      }
      cy.wait('@queryGetListingTerms')
      cy.wait('@queryGetUsers')
      cy.wait('@queryGetListingFeatures')
      cy.wait('@queryGetListingTypes')
      cy.wait('@queryGetCountries')
      cy.url().should('eq', `${Cypress.config().baseUrl}/listing/create`)
    },
    show: (direct = true) => {
      // visit the url directly
      if (direct) {
        cy.visit('/listings')
      } else {
        cy.visit('/')
        cy.toggleSideMenu(true)
        cy.getBySel('Listings').click()
      }
      cy.wait('@queryGetListingTypes')
      cy.wait('@queryGetListingTerms')
      cy.wait('@queryGetCountries')
      cy.wait('@queryGetListings')
      cy.url().should('eq', `${Cypress.config().baseUrl}/listings`)
    },
    update: (listing: CyFactoryListing) => {
      listings.navigation.show()

      cy.toggleElement('btn.filter', true)

      // filter by name
      cy.getBySel('filter.listing.id')
        .find('input')
        .clear()
        .type(`${listing.id}{enter}`)
        .then(() => {
          cy.wait('@queryGetListings')

          cy.getBySel('listing.list')
            .contains(listing.address)
            .parents('[data-test="listing.card"]')
            .find('[data-test="update"]')
            .first()
            .click()
          cy.url().should('eq', `${Cypress.config().baseUrl}/listing/${listing.id}/update`)
          cy.wait('@queryGetListing')
          cy.wait('@queryGetListingTerms')
          cy.wait('@queryGetUsers')
          cy.wait('@queryGetListingFeatures')
          cy.wait('@queryGetListingTypes')
          cy.wait('@queryGetCountries')
          cy.wait('@queryGetCities')
          cy.wait('@queryGetStates')
        })
    },
  },
}

export { intercepts, listings, CyFactoryListing }
