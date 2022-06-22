import { SubmissionContext } from 'vee-validate'
import { ApolloError } from '@apollo/client/core'

export const gqlHandleError = (error: ApolloError, currentForm?: SubmissionContext) => {
  // if form exist and gql error exist do next
  if (currentForm && error.graphQLErrors[0]?.extensions.validation) {
    // iterate over gql server errors and show in form fields
    for (const [fieldsName, validationError] of Object.entries(
      error.graphQLErrors[0].extensions.validation as { fieldsName: string; validationErrors: string }
    )) {
      currentForm.setErrors({ [fieldsName]: validationError })
    }
  }
}
