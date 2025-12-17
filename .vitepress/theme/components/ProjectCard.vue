<template>
  <a
    :href="linkHref"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="w-full"
  >
    <div class="p-1 flex md:flex-row w-full gap-2 rounded-2xl border-2 border-[var(--vp-c-border)] hover:bg-[var(--vp-c-bg-soft)]">
        <img class="m-1 w-12 h-12 sm:w-12 sm:h-12 aspect-square" :src="withBase(image)" :alt="title" />
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
import { computed } from 'vue'

const props = defineProps({
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

const isExternal = computed(() => /^[a-z][a-z0-9+.-]*:/i.test(props.href) || props.href.startsWith('//'))
const linkHref = computed(() => (isExternal.value ? props.href : withBase(props.href)))
</script>
