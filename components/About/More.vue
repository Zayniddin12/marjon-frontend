<template>
  <div
    class="container flex max-[900px]:flex-col justify-between items-center !py-16 gap-6"
  >
    <div class="w-1/2">
      <CommonSection
        class="!text-left !px-0 sm:mb-8 mb-2"
        title-class="md:text-[40px] sm:text-2xl text-xl text-dark font-bold !leading-[130%]"
        :title="dataAbout?.title"
        :subtitle="dataAbout?.short_description"
      />
      <div class="description" v-html="dataAbout?.description" />
    </div>
    <div class="md:w-1/2 w-full relative">
      <img
        v-if="dataAbout?.video_url"
        :src="toImg(dataAbout?.video_url)"
        class="aspect-video rounded-2xl w-full h-full object-cover"
      />
      <div
        class="w-full h-full top-0 left-0 absolute z-10 bg-dark-100 rounded-2xl opacity-50"
      />
      <img
        src="/images/svg/youtube.svg"
        class="absolute block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-300"
        @click="openModal"
      />
    </div>
    <CommonModal
      no-header
      :show="show"
      @close="show = false"
      body-class="!max-w-[784px]"
    >
      <template #default>
        <iframe
          v-if="dataAbout?.video_url"
          :src="dataAbout?.video_url"
          class="w-full h-full aspect-video rounded-xl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </template>
    </CommonModal>
  </div>
</template>
<script lang="ts" setup>
const dataAbout = ref(null)
const imgUrl = ref(null)
const show = ref(false)

function getAbout() {
  useApi()
    .$get('common/AboutCompanyAPI/')
    .then((res) => {
      dataAbout.value = res
      imgUrl.value = dataAbout.value.video_url
    })
}

function toImg(url: string) {
  const regExp = /https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
  const match = url.match(regExp)

  if (match && match[1].length === 11) {
    return `https://img.youtube.com/vi/${match[1]}/0.jpg`
  } else {
    return 'error'
  }
}

getAbout()

function close() {
  show.value = false
}

function openModal() {
  show.value = true
}
</script>
<style>
.description p {
  color: #190a35;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  margin-bottom: 5px;
}

.description ul::marker {
  color: green;
  padding: 0 !important;
}

.description ul {
  list-style: none;
  padding-left: 20px;
  color: #190a35;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.description li {
  display: flex;
  align-items: center;
}

.description li::before {
  content: '•';
  color: green;
  font-size: 32px;
  line-height: normal;
  display: inline-block;
  width: 0.5em;
  margin-left: -1em;
  margin-top: -0.1em;
}
</style>
