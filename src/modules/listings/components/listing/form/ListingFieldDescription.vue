<template>
  <v-textarea
    v-model="value"
    :model-value="value"
    :error-messages="errors"
    :label="t('messages.description')"
    rows="2"
    row-height="40"
    auto-grow
    outlined
    data-test="listing.description"
  />
  <v-alert type="info" density="compact" class="mt-3">
    Don't know what to say? Click here to automatically generate a brief description.
    <v-btn
      small
      color="indigo"
      :loading="listingLoadingTerms || listingLoadingTypes"
      data-test="listing.generate.description"
      @click="generate"
    >
      Generate description
    </v-btn>
  </v-alert>
  <div
    v-if="isGenerated && checkReqFieldForGenerationDescription.length !== 0"
    style="color: #f00"
    class="mt-3"
    data-test="listing.generate.required"
  >
    <p><strong>Warning!</strong> You are missing the following required information:</p>
    <p />
    <ul v-for="(field, i) in checkReqFieldForGenerationDescription" :key="i" class="ml-6">
      <li>{{ field.name }} Missing</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { petItems } from '@/modules/listings/helpers/listing'
import { ListingTerms, ListingTypes } from '@/plugins/apollo/schemaTypesGenerated'
import GetListingTerms from '@/modules/listings/graphql/queries/getListingTerms.gql'
import GetListingTypes from '@/modules/listings/graphql/queries/getListingTypes.gql'

const { t } = useI18n()
const { value, errors, setValue } = useField('description')
const isGenerated = ref(false)

const { value: valueBedrooms } = useField<string>('bedrooms')
const { value: valueBathrooms } = useField<string>('bathrooms')
const { value: valueAvailableAt } = useField('available_at')
const { value: valueAddress } = useField('address')
const { value: valuePrice } = useField('price')
const { value: valuePets } = useField<Array<string>>('pets')
const { value: valueTerm } = useField('term_id')
const { value: valueType } = useField('type_id')
const { value: valueAmenities } = useField<Array<string>>('amenities')
const { value: valueUtilities } = useField<Array<string>>('utilities')
const { value: valueAccessibility } = useField<Array<string>>('accessibility')

const { result: resultTerms, loading: listingLoadingTerms } = useQuery(
  GetListingTerms,
  { pagination: { take: 999, page: 1 } },
  { clientId: 'public' }
)
const { result: resultTypes, loading: listingLoadingTypes } = useQuery(
  GetListingTypes,
  { pagination: { take: 999, page: 1 } },
  { clientId: 'public' }
)
const listingTermsData = computed(() => resultTerms.value?.listing_terms.data ?? [])
const listingTypesData = computed(() => resultTypes.value?.listing_types.data ?? [])

const checkReqFieldForGenerationDescription = computed(() => {
  return [
    { name: 'Bedrooms', value: valueBedrooms.value },
    { name: 'Bathrooms', value: valueBathrooms.value },
    { name: 'Address', value: valueAddress.value },
    { name: 'Available Date', value: valueAvailableAt.value },
    { name: 'Price', value: valuePrice.value },
    { name: 'Pets', value: valuePets.value },
    { name: 'Amenities', value: valueAmenities.value },
    { name: 'Utilities', value: valueUtilities.value },
    { name: 'Property type', value: valueType.value },
  ].filter((field) => {
    if (field.value === undefined || field.value === null || field.value === '') {
      return field
    } else if (Array.isArray(field.value) && field.value.length === 0) {
      return field
    }
  })
})

const generate = () => {
  isGenerated.value = true
  if (checkReqFieldForGenerationDescription.value.length === 0) {
    const listingTypeObject = listingTypesData.value
      .find((typeItem: ListingTypes) => typeItem.id === valueType.value)
      .description.toLowerCase()
    let accessibility = ''
    if (valueAccessibility.value !== undefined && valueAccessibility.value.length > 0) {
      accessibility = `In this ${listingTypeObject}, people with disabilities can live in the comfort of having ${valueAccessibility.value.map(
        (item) => ' ' + item.toLowerCase()
      )}.`
    }
    // optional field listing term lease
    let termLease = ''
    if (valueTerm.value !== undefined && valueTerm.value !== null) {
      const listingTermObject = listingTermsData.value
        .find((termItem: ListingTerms) => termItem.id === valueTerm.value)
        .description.toLowerCase()
      termLease = `, Term lease for ${listingTermObject}`
    }

    // petOptions as text
    const selectedPets = petItems
      .map((petItem) => {
        if (valuePets.value.includes(petItem.value)) {
          return petItem.title.toLowerCase()
        }
      })
      .filter((field) => field !== undefined)

    const description = `Great for entertaining: spacious, bright ${valueBedrooms.value} ${t(
      'messages.bedroom',
      valueBedrooms.value
    ).toLowerCase()} ${valueBathrooms.value} ${t('messages.bathroom', valueBathrooms.value).toLowerCase()} in ${
      valueAddress.value
    }, available since ${valueAvailableAt.value}. \n\
Has${valueAmenities.value.map((item) => ' ' + item.toLowerCase())}. The ${listingTypeObject} has the next pet policy:${selectedPets.map(
      (petPolicy) => ' ' + petPolicy
    )}. \n\
${valuePrice.value}$/month${termLease}. Included utilities: ${valueUtilities.value.map((item) => ' ' + item.toLowerCase())}. \n\
${accessibility}
Call Today!`
    setValue(description)
  }
}
</script>
