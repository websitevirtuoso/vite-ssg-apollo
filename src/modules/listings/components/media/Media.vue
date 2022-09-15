<template>
  <v-container fluid>
    <draggable
      :list="modelValue"
      :component-data="{ 'no-gutters': true }"
      ghost-class="ghost"
      tag="v-row"
      @start="dragging = true"
      @end="dragging = false"
      item-key="id"
    >
      <template #item="{ element }">
        <v-col cols="4" md="3" sm="2" lg="2" xl="2" class="pa-1">
          <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props">
              <img :src="convertFileSourceToUrl(element.file)" class="d-block w-100 h-100" alt="" />
              <v-overlay
                :model-value="isHovering"
                color="grey darken-3"
                contained
                class="align-center justify-center"
                transition="slide-y-transition"
              >
                <v-btn size="x-small" flat icon="mdi-pencil" @click="setImageToEdit(element)" />
                <v-btn size="x-small" flat icon="mdi-cursor-move" class="mx-2" />
                <v-btn size="x-small" flat icon @click="rmByIndex(element.id)">
                  <v-icon color="red darken-2">mdi-delete</v-icon>
                </v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
        </v-col>
      </template>
      <template #footer>
        <v-col cols="3" class="pa-1">
          <div class="upload-card d-flex" @click="() => $refs.input.click()">
            <v-icon class="ma-auto" large>mdi-plus</v-icon>
            <input ref="input" type="file" accept="image/*" multiple style="display: none" @change="addImages" />
          </div>
        </v-col>
      </template>
    </draggable>
  </v-container>
  <media-editor
    v-if="selectedItem !== null"
    :show="showEditor"
    :item="selectedItem"
    @delete="rmByIndex"
    @close="closeEditor"
    @update:item="replaceEditedItem"
  />
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import MediaEditor from './MediaEditor.vue'
import { MediaItem } from '@/modules/listings/types'
import { convertFileSourceToUrl, getAbsolutePath } from '@/modules/listings/helpers/listing'
import { Listing_Media_Status, ListingMedias } from '@/plugins/apollo/schemaTypesGenerated'

const props = defineProps({
  /**
   *  Return list of objects with struct
   *  We use status to inform server to mutation file or not
   *  If file is changed  then send property file
   *  {id - 'id for iteration', path, status - 'MODIFIED or NOT_MODIFIED', file- 'blob format of file'} */
  modelValue: {
    type: Array as () => MediaItem[],
    required: true,
    default: () => [],
  },
  /**
   *  Accept list of objects
   *  {id: item.id, path: item.path } */
  items: {
    type: Array as () => ListingMedias[],
    required: false,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue'])

const dragging = ref(false)
const showEditor = ref(false)
const selectedItem = ref<MediaItem | null>(null)
const input = ref<HTMLInputElement | null>(null)

onBeforeMount(() => {
  isItemsValid(props.items)
  props.items.forEach((item: ListingMedias) => {
    isFileImage(item.path)
    // @ts-expect-error we know it works
    fetchFile(getAbsolutePath(item.path)).then((blob: Blob, index: number) => {
      props.modelValue.push({ id: index, file: blob, status: Listing_Media_Status.NotModified })
    })
  })
  emit('update:modelValue', props.modelValue)
})

/**
 * Check that input list has valid format
 * @param items must include {id, path}
 * */
const isItemsValid = (items: ListingMedias[]) => {
  items.forEach((item) => {
    if (!['id', 'path'].every({}.hasOwnProperty.bind(item))) {
      throw new Error('Property Media prop media send invalid object: ' + item)
    }
  })
}

/**
 * Fetch url from server in blob format
 * @param fileUrl absolute path
 * */
const fetchFile = (fileUrl: string) => {
  return fetch(fileUrl)
    .then((res) => res.blob()) // Gets the response and returns it as a blob
    .catch((error) => {
      throw new Error(error)
    })
}

/**
 * Check that path is image
 * @param imageUrl path
 * */
const isFileImage = (imageUrl: string) => {
  if (!imageUrl.toLowerCase().match(/.(jpg|jpeg|png|gif|bmp|svg|webp)$/i)) {
    throw new Error('This file is not image ' + imageUrl.toLowerCase())
  }
  return true
}

const addImages = () => {
  const files = input.value?.files
  // check that element files exist
  if (files == undefined) {
    alert('This file is not an image')
    return
  }

  // case when user use upload multiple times and we need to use latest index from existing files
  const existingIndex = props.modelValue.length
  // @ts-expect-error we know it works
  files.forEach((file, index) => {
    if (isFileImage(file.name)) {
      props.modelValue.push({ id: existingIndex + index, file: file, status: Listing_Media_Status.Modified })
    } else {
      alert('This file is not an image')
    }
  })
  emit('update:modelValue', props.modelValue)
}

const replaceEditedItem = (updatedItem: MediaItem) => {
  const foundIndex = props.modelValue.findIndex((item) => item.id === updatedItem.id)
  props.modelValue[foundIndex] = updatedItem
  emit('update:modelValue', props.modelValue)
}

/**
 * Remove image by object id
 * @param idx
 */
const rmByIndex = (idx: number) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((item) => item.id !== idx)
  )
}

const setImageToEdit = (mediaItem: MediaItem) => {
  selectedItem.value = mediaItem
  showEditor.value = true
}

const closeEditor = () => {
  selectedItem.value = null
  showEditor.value = false
}
</script>

<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.upload-card {
  background-color: #fbfdff;
  border: 2px dashed #c0ccda;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  line-height: 146px;
  min-height: 150px;
  display: inline-block;
  outline: none;
}
</style>
