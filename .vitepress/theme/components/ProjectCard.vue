<template>
  <a :href="href" class="w-full">
    <div class="p-1 flex md:flex-row w-full gap-2 rounded-2xl border-2 border-[var(--vp-c-border)] hover:bg-[var(--vp-c-bg-soft)]">
        <img class="m-1 w-12 h-12 sm:w-12 sm:h-12" :src="withBase(image)" :alt="title" />
      <div class="flex flex-col gap-0">
        <div class="text-base font-bold">
          {{ title }}
        </div>
        <div class="m-0 p-0 text-sm no-underline text-inherit">
          <p class="m-0 p-0 inline">{{ description }}</p>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
import { withBase } from 'vitepress'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
})
</script>
