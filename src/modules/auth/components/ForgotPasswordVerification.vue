<template>
  <v-dialog :model-value="show" :persistent="true" max-width="490">
    <v-card>
      <v-card-title class="text-h5">Reset Password</v-card-title>
      <v-card-text class="mx-3">
        <ol>
          <li>We emailed a password reset link to your email. Please follow the instructions in that email.</li>
          <li>Check the inbox of the email address you use to sign in to your account.</li>
          <li>Check your Spam or Bulk Mail folders. It's possible that the email we tried to send you was caught by a spam or bulk mail filter in your email system.</li>
        </ol>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" :to="{ name: 'login' }">Go to login page</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
</script>
