<template>
  <posts-query v-slot="{ items, loading }" slug="terms-of-use">
    <v-dialog :model-value="show" width="600px" scrollable @click:outside="$emit('close')">
      <v-card :loading="loading">
        <v-card-title>
          <span class="text-h5" v-html="items[0].title" />
          <!-- todo check css class -->
        </v-card-title>
        <v-card-text style="height: 85vh">
          <div v-html="items[0].content" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="$emit('close')"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </posts-query>
</template>

<script setup lang="ts">
import PostsQuery from '@/modules/blog/components/posts/RenderlessPostsQuery.vue'

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})

defineEmits<{
  (e: 'close'): void
}>()
</script>
