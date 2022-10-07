<template>
  <v-container fluid data-test="listing.media">
    <draggable
      :list="mediaItems"
      :component-data="{ 'no-gutters': true }"
      ghost-class="ghost"
      tag="v-row"
      item-key="id"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <v-col cols="4" md="3" sm="2" lg="2" xl="2" class="pa-1">
          <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" data-test="listing.media.card">
              <img :src="convertFileSourceToUrl(element.file)" class="d-block w-100 h-100" alt="" />
              <v-overlay
                :model-value="isHovering"
                color="grey darken-3"
                contained
                class="align-center justify-center"
                transition="slide-y-transition"
              >
                <v-btn size="x-small" flat :icon="mdiPencil" @click="setImageToEdit(element)" />
                <v-btn size="x-small" flat :icon="mdiCursorMove" class="mx-2" />
                <v-btn size="x-small" flat icon @click="rmByIndex(element.id)">
                  <v-icon color="red darken-2">{{ mdiDelete }}</v-icon>
                </v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
        </v-col>
      </template>
      <template #footer>
        <v-col cols="3" class="pa-1">
          <drop-zone v-slot="{ dropZoneActive }" class="drop-area" @files-dropped="addDropImages">
            <div
              class="upload-card d-flex"
              :class="dropZoneActive ? 'zone-active' : ''"
              data-test="listing.media.drop-zone"
              @click="() => $refs.input.click()"
            >
              <v-icon class="ma-auto" large>{{ mdiPlus }}</v-icon>
              <input
                ref="input"
                type="file"
                accept="image/*"
                multiple
                class="d-none"
                data-test="listing.media.input"
                @change="addInputImages"
              />
            </div>
          </drop-zone>
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
  <v-error-message name="media" />
  <!-- todo doesnt work. need wait more releases yup or vee-validate -->
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import MediaEditor from './MediaEditor.vue'
import { MediaItem } from '@/modules/listings/types'
import { convertFileSourceToUrl, getAbsolutePath } from '@/modules/listings/helpers/listing'
import { Listing_Media_Status, ListingMedias } from '@/plugins/apollo/schemaTypesGenerated'
import VErrorMessage from '@/components/fields/VErrorMessage.vue'
import DropZone from '@/modules/listings/components/listing/form/media/DropZone.vue'

const lProps = defineProps({
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
const mediaItems = ref<Array<MediaItem>>([])
const selectedItem = ref<MediaItem | null>(null)
const input = ref<HTMLInputElement>()
const { setValue } = useField('media')

const onInitItems = () => {
  setMedias([])
  isItemsValid(lProps.items)
  lProps.items.forEach((item: ListingMedias, index: number) => {
    // console.log(1)
    isFileImage(item.path)
    fetchFile(getAbsolutePath(item.path)).then((blob: Blob) => {
      mediaItems.value.push({ id: index, originalID: item.id, file: blob, status: Listing_Media_Status.NotModified })
    })
  })
  setMedias(mediaItems.value)
}

// reinit when props changed
watch(() => lProps.items, onInitItems)

/**
 * Check that input list has valid format
 * @param items must include {id, path}
 * */
const isItemsValid = (items: ListingMedias[]) => {
  items.forEach((item) => {
    if (!['id', 'path'].every({}.hasOwnProperty.bind(item))) {
      throw new Error('Property Media prop sent invalid object: ' + item)
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

const addInputImages = () => {
  // @ts-expect-error we know it cant be null or undefined
  addImages(input.value.files)
}

const addDropImages = (files: File[]) => {
  addImages(files)
}

const addImages = (files: File[]) => {
  // case when user use upload multiple times and we need to use latest index from existing files
  const existingLastIndex = mediaItems.value.length
  files.forEach((file, index) => {
    if (isFileImage(file.name)) {
      mediaItems.value.push({ id: existingLastIndex + index, file: file, status: Listing_Media_Status.Modified })
    } else {
      alert('This file is not an image')
    }
  })
  setMedias(mediaItems.value)
}

const replaceEditedItem = (updatedItem: MediaItem) => {
  const foundIndex = mediaItems.value.findIndex((item) => item.id === updatedItem.id)
  mediaItems.value[foundIndex] = updatedItem
  setMedias(mediaItems.value)
}

/**
 * Remove image by object id
 * @param idx
 */
const rmByIndex = (idx: number) => {
  const filteredItems = mediaItems.value.filter((item) => item.id !== idx)
  mediaItems.value = filteredItems
  setMedias(filteredItems)
}

const setImageToEdit = (mediaItem: MediaItem) => {
  selectedItem.value = mediaItem
  showEditor.value = true
}

const closeEditor = () => {
  selectedItem.value = null
  showEditor.value = false
}

const setMedias = (mediaItems: MediaItem[]) => {
  setValue(mediaItems)
  emit('update:modelValue', mediaItems)
}
</script>

<style>
.ghost {
  background: #c8ebfb;
  opacity: 0.5;
}

.upload-card {
  width: 100%;
  height: 100%;
  min-height: 150px;
  line-height: 146px;
  cursor: pointer;
  background-color: #fbfdff;
  border: 2px dashed #c0ccda;
  border-radius: 4px;
  outline: none;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.zone-active {
  position: relative;
  z-index: 0;
  overflow: hidden;
}

.zone-active::before {
  position: absolute;
  top: -50%;
  left: -50%;
  z-index: -2;
  width: 200%;
  height: 200%;
  content: '';
  background-color: #fff;
  background-image: conic-gradient(#509cd3, #509cd3ff);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 50% 50%;
  animation: rotate 4s linear infinite;
}

.zone-active::after {
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: -1;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  content: '';
  background: white;
  border-radius: 5px;
  animation: opacityChange 3s infinite alternate;
}

@keyframes opacityChange {
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
