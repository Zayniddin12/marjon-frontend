<template>
  <div class="container mb-8">
    <div class="mt-8 relative">
      <div class="relative">
        <div class="static-text">
          <div v-html="getFirstParagraphHTML(single?.public_offer)" />
        </div>
        <span
          v-if="
            single &&
            single?.public_offer &&
            getFirstParagraphHTML(single?.public_offer)
          "
          class="absolute w-full h-[30px] -bottom-[5px] shadow-section rounded-b-[20px] transition duration-200"
          :class="{ 'opacity-0': openMore }"
        />
        <CollapseTransition>
          <div v-show="openMore" class="pt-4 static-text">
            <div>
              <div
                v-html="getTextExceptFirstParagraphHTML(single?.public_offer)"
              />
            </div>
          </div>
        </CollapseTransition>
      </div>

      <Button
        v-if="
          single &&
          single?.public_offer &&
          getTextExceptFirstParagraphHTML(single?.public_offer)
        "
        :text="$t('read_more')"
        :is-hide="openMore"
        class="mt-4"
        @click="openMore = !openMore"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import Button from '~/components/Common/Button/Button.vue'

interface ISingle {
  title: string
  slug: string
  public_offer: string
}

const openMore = ref(false)

// Function to divide text into paragraphs and return the first paragraph
function getFirstParagraphHTML(htmlString) {
  const paragraphs = htmlString.split(/\r\n\r\n/)
  return paragraphs.length > 0 ? paragraphs[0] : ''
}

// Function to return the full text except the first paragraph from an HTML string
function getTextExceptFirstParagraphHTML(htmlString) {
  const paragraphs = htmlString.split(/\r\n\r\n/)
  if (paragraphs.length > 1) {
    return paragraphs.slice(1).join('\r\n\r\n')
  }
  return ''
}

const { data: single } = await useAsyncData('StaticPages', () =>
  useApi().$get('/common/StaticPages/seo-collapse/')
)
</script>

<style>
.shadow-section {
  background: linear-gradient(180deg, rgba(250, 250, 252, 0), #fafafc);
}
</style>
