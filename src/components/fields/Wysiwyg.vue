<template>
  <div :data-test="dataTest">
    <div v-show="label" class="text-subtitle-2 f-600 mb-3 mt-3">{{ label }}</div>
    <editor
      v-bind="$attrs"
      :toolbar="toolbar"
      :plugins="plugins"
      :api-key='key'
      :init="{ menubar, branding: false }"/>
      <div v-show="errorMessages.length > 0" class="v-input__details">
        <div class="v-messages validation__error">
          <div v-for="(error, i) in errorMessages" :key="i" class="v-messages__message">
            {{ error }}
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'Wysiwyg',
  components: { Editor },
  props: {
    label: {
      type: String,
      required: false,
      default: () => ''
    },
    dataTest: {
      type: String,
      required: false,
      default: () => ''
    },
    errorMessages: {
      type: Array,
      required: false,
      default: () => [],
    },
    menubar: {
        type: [String, Boolean],
        default: false,
    },
    plugins: {
        type: String,
        default: 'codesample autolink link autoresize lists emoticons image preview table',
    },
    toolbar: {
        type: String,
        default: 'newdocument undo redo bold italic strikethrough underline codesample h2 bullist numlist alignleft aligncenter alignright alignjustify blockquote indent outdent link table emoticons forecolor backcolor preview removeformat',
    },
  },
  data: () => ({
    key: import.meta.env.VITE_TINYMCE_KEY
  }),
}
</script>

<style lang="scss">
.validation__error {
  color: rgb(var(--v-theme-error));
  opacity: 1;
}
</style>
