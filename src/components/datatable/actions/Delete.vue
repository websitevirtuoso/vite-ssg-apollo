<template>
  <v-scale-transition>
    <v-btn v-bind="$attrs" icon size="small" flat color="pink" data-test="btn.delete" @click="show = true">
      <v-icon icon=" mdi-delete" color="white" />
    </v-btn>
  </v-scale-transition>
  <v-dialog v-model="show" persistent max-width="490">
    <v-card>
      <v-card-title class="text-h6">Delete</v-card-title>
      <v-divider />
      <v-card-text> Are you sure you want to delete selected record(s)? </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="grey" flat @click="show = false"> Cancel </v-btn>
        <v-spacer />
        <v-btn color="error" :loading="mutationLoading" @click="deleteRecords"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
import { PropType } from 'vue'
import { gqlHandleError } from '@/helpers/handleErrors'

const show = ref(false)

const props = defineProps({
  mutation: {
    type: Object as PropType<any>,
    required: true,
  },
  ids: {
    type: Array,
    required: false,
    default: () => [],
  },
  parentRouteName: {
    type: String,
    required: false,
    default: () => '',
  },
})

const emit = defineEmits(['onDone'])

const { mutate, loading: mutationLoading, onDone, onError } = useMutation(props.mutation)

onDone(() => {
  show.value = false
  emit('onDone')
})

onError((error) => {
  gqlHandleError(error)
})

const deleteRecords = () => {
  mutate({ id: props.ids })
}
</script>
