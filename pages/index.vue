<template>
    <TheHeader />
    <div>index.vue</div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})
</script>
