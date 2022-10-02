<template>
  <v-dialog :model-value="show" scrollable persistent max-width="600">
    <v-card>
      <v-toolbar density="compact">
        <v-toolbar-title> Photo Editor </v-toolbar-title>
        <v-spacer />
        <v-tooltip text="delete image" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" :icon="mdiDelete" tile :rounded="0" color="red darken-2" @click="removeInModal" />
          </template>
        </v-tooltip>
        <v-divider vertical />
        <v-tooltip text="save changes" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" :icon="mdiCheck" tile :rounded="0" color="primary" @click="applyChanges" />
          </template>
        </v-tooltip>
        <v-divider vertical />
        <v-tooltip text="close without saving" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" :icon="mdiClose" tile :rounded="0" color="primary" @click="closeEdit" />
          </template>
        </v-tooltip>
      </v-toolbar>
      <v-card-text class="px-0">
        <img id="canvas" ref="cropperTempRef" :src="convertFileSourceToUrl(item.file)" alt="" />
      </v-card-text>
      <v-card-actions>
        <v-tooltip v-for="f in cropperFunctions" :text="f.text" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" size="small" :icon="f.icon" tile :rounded="0" color="primary" @click="f.onClick()" />
          </template>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import Cropper from 'cropperjs'
import { MediaItem } from '@/modules/listings/types'
import { convertFileSourceToUrl } from '@/modules/listings/helpers/listing'
import { Listing_Media_Status } from '@/plugins/apollo/schemaTypesGenerated'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object as () => MediaItem,
    required: true,
  },
})

const emit = defineEmits(['delete', 'close', 'update:item'])

const cropperTempRef = ref<HTMLImageElement | null>(null)
let cropper: Cropper | undefined

const initCropper = () => {
  // @ts-expect-error cropperTempRef can be null
  cropper = new Cropper(cropperTempRef.value, {
    viewMode: 2,
    aspectRatio: null,
    autoCrop: false,
    autoCropArea: 1,
  })
}

// init when first mounted
onMounted(initCropper)

// reinit when props changed
watch(
  () => props,
  () => {
    cropper?.destroy()
    nextTick(initCropper)
  },
  { deep: true }
)

const closeModal = () => {
  emit('close')
}

const removeInModal = () => {
  closeModal()
  emit('delete', props.item.id)
}

const closeEdit = () => {
  closeModal()
  cropper?.clear()
  cropper?.destroy()
}

const applyChanges = () => {
  cropper?.crop()
  cropper
    ?.getCroppedCanvas({
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    })
    .toBlob((blob) => {
      emit('update:item', { ...props.item, file: blob, status: Listing_Media_Status.Modified })
      // emit('update:item', { id: props.item.id, originalID: props.item.originalID, file: blob, status: Listing_Media_Status.Modified })
      closeModal()
    })
}

const rotate = (deg: number) => {
  cropper?.rotate(deg)
}
const flipX = () => {
  cropper?.scaleX(cropper.getData().scaleX === 1 ? -1 : 1)
}
const flipY = () => {
  cropper?.scaleY(cropper.getData().scaleY === 1 ? -1 : 1)
}
const setDragMode = () => {
  cropper?.setDragMode('crop')
}
const clear = () => {
  cropper?.clear()
}

const cropperFunctions = [
  { text: 'crop image', icon: mdiCrop, onClick: setDragMode },
  { text: 'crop reset', icon: mdiSync, onClick: clear },
  { text: 'rotate left', icon: mdiRotateLeft, onClick: () => rotate(90) },
  { text: 'rotate right', icon: mdiRotateRight, onClick: () => rotate(-90) },
  { text: 'flip horizontal', icon: mdiArrowLeftRight, onClick: flipX },
  { text: 'flip vertical', icon: mdiArrowUpDown, onClick: flipY },
]
</script>

<style>
@import 'cropperjs/dist/cropper.css';
#canvas {
  min-width: 100%;
  max-width: 100%;
}
/*fix bg in cropper container*/
.cropper-bg {
  background-repeat: repeat;
}
</style>
