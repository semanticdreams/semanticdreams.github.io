<template>
  <div class="flex flex-col md:flex-row w-full gap-x-3">
    <small class="shrink-0 pt-1 w-24 md:text-right">
      {{ date }}
    </small>
    <div class="flex flex-col gap-0">
      <a :href="href" class="text-base font-bold">
        {{ title }}
      </a>
      <div class="m-0 p-0 text-sm">
        <p class="m-0 p-0 inline">{{ excerpt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
    },
};
</script>
