<template>
  <Form v-slot="{ errors: formErrors }" as="v-form" :initial-values="initialValues" :validation-schema="vSchema()" @submit="createListing">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="my-0 py-0">
          <v-card :title="t('messages.create_', { title: 'listing' })" />
        </v-col>
        <v-col cols="12" md="6">
          <v-card title="Details">
            <v-card-text class="px-0">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <listing-field-user />
                  </v-col>
                  <v-col cols="12" md="6">
                    <listing-field-price />
                  </v-col>
                  <v-col cols="12" md="6">
                    <listing-field-deposit />
                  </v-col>
                  <v-col cols="12" md="6">
                    <listing-field-status />
                  </v-col>
                  <v-col cols="12" md="6">
                    <listing-field-square-feet />
                  </v-col>
                  <v-col cols="12" md="6">
                    <listing-field-term />
                  </v-col>
                  <v-col cols="12" md="3">
                    <listing-field-bedrooms />
                  </v-col>
                  <v-col cols="12" md="3">
                    <listing-field-bathrooms />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <listing-field-available />
                  </v-col>
                  <v-col cols="12" md="6">
                    <listing-field-expire />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-card :title="t('messages.pets')" class="mt-5">
            <v-card-text>
              <listing-field-pets />
            </v-card-text>
          </v-card>
          <v-card class="mt-5">
            <listing-fields-features />
          </v-card>
          <v-card :title="t('messages.description')" class="mt-5">
            <v-card-text>
              <listing-field-description />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card :title="t('messages.property_type')">
            <v-card-text>
              <listing-type-part />
            </v-card-text>
          </v-card>
          <v-card :title="t('messages.location')" class="mt-5">
            <region-part show-autocomplete show-postal-code show-address show-countries show-states show-cities show-map />
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card title="Add photos">
            <v-card-text class="pa-0">
              <media />
            </v-card-text>

            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="mutationLoading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="listing.submit"
              >
                <v-icon left>{{ mdiContentSave }}</v-icon>
                {{ t('action.create') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </Form>
</template>

<script setup lang="ts">
import { Form, SubmissionContext } from 'vee-validate'
// custom
import { gqlHandleError } from '@/helpers/handleErrors'
import { MutationListingFormArgs } from '@/modules/listings/types'
import vSchema from '@/modules/listings/helpers/validationSchemaListing'
import { useNotification } from '@/modules/notifications/useNotification'
import ListingUpsert from '@/modules/listings/graphql/mutations/listingUpsert.gql'
import { Listing_Status, MutationListingUpsertArgs } from '@/plugins/apollo/schemaTypesGenerated'

// components
import Media from '@/modules/listings/components/listing/form/media/Media.vue'
import ListingTypePart from '@/modules/listings/components/listing/form/ListingTypePart.vue'
import ListingFieldUser from '@/modules/listings/components/listing/form/ListingFieldUser.vue'
import ListingFieldPrice from '@/modules/listings/components/listing/form/ListingFieldPrice.vue'
import ListingFieldDeposit from '@/modules/listings/components/listing/form/ListingFieldDeposit.vue'
import ListingFieldStatus from '@/modules/listings/components/listing/form/ListingFieldStatus.vue'
import ListingFieldSquareFeet from '@/modules/listings/components/listing/form/ListingFieldSquareFeet.vue'
import ListingFieldTerm from '@/modules/listings/components/listing/form/ListingFieldTerm.vue'
import ListingFieldBedrooms from '@/modules/listings/components/listing/form/ListingFieldBedrooms.vue'
import ListingFieldBathrooms from '@/modules/listings/components/listing/form/ListingFieldBathrooms.vue'
import ListingFieldAvailable from '@/modules/listings/components/listing/form/ListingFieldAvailable.vue'
import ListingFieldExpire from '@/modules/listings/components/listing/form/ListingFieldExpire.vue'
import ListingFieldPets from '@/modules/listings/components/listing/form/ListingFieldPets.vue'
import ListingFieldDescription from '@/modules/listings/components/listing/form/ListingFieldDescription.vue'
import ListingFieldsFeatures from '@/modules/listings/components/listing/form/ListingFieldsFeatures.vue'
import RegionPart from '@/modules/regions/components/form/RegionPart.vue'
import { prepareMediaBeforeUpload } from '@/modules/listings/helpers/listing'

const initialValues = { status: Listing_Status.Active, amenities: [], utilities: [], accessibility: [] }
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(ListingUpsert)

const { t } = useI18n()
const notification = useNotification()
const router = useRouter()

onDone(({ data }) => {
  notification.success(t('action.create_success'))
  router.push({ name: 'listing-view', params: { id: data.listingUpsert.id } })
})

const createListing = (
  {
    price,
    deposit,
    status,
    square_feet,
    bedrooms,
    bathrooms,
    expire_at,
    available_at,
    address,
    pets,
    postal_code,
    description,
    term_id,
    type_id,
    city_id,
    user,
    lat,
    lng,
    amenities,
    utilities,
    accessibility,
    media,
  }: MutationListingFormArgs,
  form: SubmissionContext
) => {
  mutate(
    {
      price: parseInt(price),
      deposit: deposit !== null ? parseInt(deposit) : deposit,
      status,
      square_feet: parseInt(square_feet),
      bedrooms,
      bathrooms,
      expire_at,
      available_at,
      address,
      pets,
      postal_code,
      description,
      term_id,
      type_id,
      city_id,
      user_id: user.id,
      lat,
      lng,
      features: { amenities, utilities, accessibility },
      media: prepareMediaBeforeUpload(media),
    } as MutationListingUpsertArgs,
    { context: { hasUpload: true } }
  )

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
