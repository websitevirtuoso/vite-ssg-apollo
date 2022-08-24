import { SubmissionContext } from 'vee-validate'
import { ApolloError } from '@apollo/client/core'
// import { useNotification } from '@/modules/notifications/useNotification'

export const gqlHandleError = (error: ApolloError, currentForm?: SubmissionContext) => {
  // if form exist and gql error exist do next
  if (currentForm && error.graphQLErrors[0]?.extensions.validation) {
    // iterate over gql server errors and show in form fields
    for (const [fieldsName, validationError] of Object.entries(
      error.graphQLErrors[0].extensions.validation as { fieldsName: string; validationErrors: string }
    )) {
      currentForm.setErrors({ [fieldsName]: validationError })
    }
  } else if (error.graphQLErrors[0].message) {
    // todo change notification plugin
    // const notification = useNotification()
    // notification.error(error.graphQLErrors[0].message)
  }
}
