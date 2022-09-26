<template>
  <v-checkbox v-model="value" :error-messages="errors" color="success" data-test="register.policy">
    <template #label>
      <div>
        Do you accept the
        <a href="javascript://" @click.stop="showTerms = true">terms of use?</a>
        <!--todo extend adding conditions. After this do page like this https://policy.pinterest.com/en/advertising-guidelines -->
        <!-- and <a href="javascript:;" @click.stop="conditions = true">conditions?</a>-->
      </div>
    </template>
  </v-checkbox>
  <modal-privacy-policy :show="showTerms" @close="closeModal" />
</template>

<script setup lang="ts">
import ModalPrivacyPolicy from '../ModalPrivacyPolicy.vue'

const showTerms = ref(false)
const { value, errors } = useField('policy')

const closeModal = () => {
  showTerms.value = false
}
</script>
