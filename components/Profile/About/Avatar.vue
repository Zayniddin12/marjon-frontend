<template>
  <div class="flex-y-center gap-3">
    <input
      id="file-avatar"
      :key="image"
      type="file"
      class="w-0 h-0"
      accept=".jpg, .png, .jpeg, .svg"
      @change="handleChange"
    />
    <div
      class="w-24 h-24 rounded-full border border-green relative overflow-hidden relative"
    >
      <img
        v-if="image"
        :src="image"
        alt="profile-avatar"
        class="w-full h-full object-cover"
      />
      <img
        v-else
        src="/images/default/default.svg"
        alt="profile-avatar"
        class="object-cover w-[78px] mx-auto absolute-x -bottom-2"
      />
    </div>
    <div class="flex flex-col gap-2">
      <button
        class="min-w-[104px] px-4 py-1 rounded-lg text-sm leading-normal font-normal text-dark transition-300 border border-gray-400 hover:border-green"
        @click="getFile"
      >
        {{ $t('change') }}
      </button>
      <button
        v-if="image"
        class="min-w-[104px] px-4 py-1 rounded-lg text-sm leading-normal font-normal text-dark transition-300 border border-red hover:border-red/40"
        @click="removeImage"
      >
        {{ $t('delete') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  defaultImage?: string | File
}

const props = defineProps<Props>()

const image = ref<any>('')

const emit = defineEmits(['change'])

function handleChange(event: any) {
  const target = event?.target as HTMLInputElement | null
  const file = target?.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = () => {
    image.value = reader.result
    emit('change', image.value)
  }
}

const getFile = () => {
  const input = document.getElementById('file-avatar')
  input?.click()
}

function removeImage() {
  emit('change', null)
  image.value = ''
}

watch(
  () => props.defaultImage,
  () => {
    if (typeof props.defaultImage === 'string') {
      image.value = props.defaultImage
    }
  },
  {
    immediate: true,
  }
)
</script>
