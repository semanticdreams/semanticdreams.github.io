<script setup>
import PostCard from "./PostCard.vue";
import { data as posts } from './../index.data.js'
</script>
<template>
    <div class="pt-3 mx-auto px-0 sm:px-4 lg:px-48 xl:px-56 2xl:px-64 flex flex-wrap justify-center mt-2 gap-4">
        <PostCard v-for="post in posts" :title="post.title" :href="post.url" :date="post.date.string" :excerpt="post.excerpt"/>
    </div>
</template>
