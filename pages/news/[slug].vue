<template>
  <div class="mt-10 pb-16">
    <div
      v-if="data?.title"
      class="container bg-white pt-7 pb-8 lg:rounded-xl relative"
    >
      <NuxtLink
        to="/news"
        class="icon-arrow text-[36px] text-dark absolute top-5 left-6 rotate-180 hover:text-dark/[50%] transition-300 max-lg:hidden"
      />
      <div class="max-w-[788px] mx-auto">
        <h1 class="text-2xl leading-130 font-bold text-dark">
          {{ data?.title }}
        </h1>
        <p class="text-base text-gray-300 mt-3">
          {{ data?.created_at }}
        </p>
        <img
          class="rounded-2xl mt-6"
          :src="data?.cover_image"
          alt="news image"
        />
        <div
          v-if="data?.content"
          class="vhtml-text mt-6"
          v-html="
            data?.content
              ?.replaceAll(`sandbox='' `, '')
              .replaceAll(`sandbox`, '')
          "
        />
        <div class="flex-center-between gap-3">
          <div class="flex-y-center gap-4">
            <CommonButtonShare @click="showShare = true" />
            <CommonButtonCopy />
          </div>
          <div class="flex-y-center gap-[18px]">
            <button
              class="icon-printer text-2xl text-gray-100"
              @click="print"
            />
            <div class="flex-y-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1303 9.8531C22.2899 11.0732 22.2899 12.9268 21.1303 14.1469C19.1745 16.2047 15.8155 19 12 19C8.18448 19 4.82549 16.2047 2.86971 14.1469C1.7101 12.9268 1.7101 11.0732 2.86971 9.8531C4.82549 7.79533 8.18448 5 12 5C15.8155 5 19.1745 7.79533 21.1303 9.8531Z"
                  stroke="#8C849A"
                  stroke-width="1.5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="#8C849A"
                  stroke-width="1.5"
                />
              </svg>
              <p class="text-base leading-[125%] text-dark">
                {{ data?.view_count }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommonModalShare
      :show="showShare"
      :title="data?.title"
      @close="showShare = false"
    />
  </div>
</template>

<script setup lang="ts">
interface ISingle {
  slug: string
  title: string
  subtitle: string
  cover_image: string
  content: string
  created_at: string
  view_count: number
}

const showShare = ref(false)
const route = useRoute()

const { data, error } = await useAsyncData('fetchSingle', () =>
  useApi().$get<ISingle>(`/news/NewsDetail/${route.params.slug}/`)
)

if (error.value) {
  showError({ statusCode: 404 })
}

function print() {
  window.print()
}

function addTargetBlankToAnchors() {
  const contentElement = document.querySelector('.vhtml-text')
  if (contentElement) {
    const anchorTags = contentElement.getElementsByTagName('a')
    for (let i = 0; i < anchorTags.length; i++) {
      anchorTags[i].setAttribute('target', '_blank')
    }
  }
}

onMounted(() => {
  if (data.value?.content) {
    addTargetBlankToAnchors()
  }
})

useSeoMeta({
  title: data.value?.title,
  description: data.value?.subtitle,
  ogTitle: data.value?.title,
  ogDescription: data.value?.subtitle,
  twitterTitle: data.value?.title,
  twitterDescription: data.value?.subtitle,
  ogImage: data.value?.cover_image,
  twitterImage: data.value?.cover_image,
})

// useHead meta keywords
useHead({
  meta: [
    {
      hid: 'keywords',
      name: 'keywords',
      content: data.value?.keywords,
    },
  ],
})
</script>

<style>
.vhtml-text p {
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #190a35;
  word-break: break-word;
  margin-bottom: 24px;
}
.vhtml-text a {
  color: #1c92e0;
}

.vhtml-text iframe {
  width: 100% !important;
  max-height: 320px !important;
}
.vhtml-text a:hover {
  text-decoration: underline;
}
.vhtml-text img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  margin: 20px 0;
}

.vhtml-text blockquote {
  margin: 20px 0;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background: #f6f5f7;
  border-radius: 20px;
}
.vhtml-text blockquote p {
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 8px;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
}
.vhtml-text blockquote p,
.vhtml-text blockquote {
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  color: #190a35;
}
.vhtml-text blockquote:after {
  content: '\e921';
  font-family: icomoon;
  position: absolute;
  right: 20px;
  bottom: 10px;
  color: rgba(209, 206, 215, 0.4);
  font-size: 78px;
  line-height: 20px;
}

.vhtml-text ol li,
.vhtml-text ul li {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #190a35;
}
.vhtml-text ul,
.vhtml-text ol {
  padding-left: 20px;
  margin: 20px 0;
}
.vhtml-text ul {
  list-style: disc;
}
.vhtml-text ol {
  list-style: auto;
}

@media screen and (max-width: 768px) {
  .vhtml-text p,
  .vhtml-text blockquote {
    font-size: 16px;
    line-height: 140%;
  }
  .vhtml-text img,
  .vhtml-text blockquote,
  .vhtml-text ul,
  .vhtml-text ol {
    margin: 12px 0;
  }
}
@media (max-width: 640px) {
  .vhtml-text ol li,
  .vhtml-text blockquote,
  .vhtml-text ul li {
    font-size: 14px !important;
  }
}
</style>
