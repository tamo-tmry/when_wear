<template>
    <h2 class="mb-4"><VIcon :icon="icon" class="mr-2" />{{ title }}</h2>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})
</script>
